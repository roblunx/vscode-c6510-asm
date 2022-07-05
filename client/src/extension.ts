// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {LanguageClient, LanguageClientOptions, ServerOptions, TransportKind} from 'vscode-languageclient/node';
import {opcodes} from './opcodes';
import {illegalOpcodes} from './illegal-opcodes';
import {vicregs} from './vic-regs';
import {sidregs} from './sid-regs';
import {cia1regs} from './cia1-regs';
import {cia2regs} from './cia2-regs';
import * as Parser from 'web-tree-sitter';
import * as path from 'path';
import * as cp from 'child_process';
import * as os from 'os';


// This uses the spread operator "..." to merge two objects into a new object.
let helpTexts:any = {
	...vicregs,
	...sidregs,
	...cia1regs,
	...cia2regs
};

for (let k in opcodes) {
	helpTexts[k.toLowerCase()] = "### " + k + "\n```text\n" + opcodes[k] + "\n```";
}

for (let k in illegalOpcodes) {
	helpTexts[k.toLowerCase()] = "### " + k + "\n" + illegalOpcodes[k];
}

let parser: Parser;
let lang: Parser.Language;
let includeSearchPaths: vscode.Uri[];
let visitedPaths: string[];
let outputChannel: vscode.OutputChannel;
//let trees: Map<string, Parser.Tree>;
let client: LanguageClient | undefined;

function startClient(context: vscode.ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	const virtualDocumentContents = new Map<string, string>();
	const onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();

	let textDocumentContentProvider = vscode.workspace.registerTextDocumentContentProvider('c6510-embedded-content', {
		onDidChange: onDidChangeEmitter.event,
		provideTextDocumentContent(uri: vscode.Uri)  {
			const originalUri = uri.path.slice(1).slice(0, -4);
			const decodedUri = decodeURIComponent(originalUri);
			const content = virtualDocumentContents.get(decodedUri);
			return content;
		}
	});
	context.subscriptions.push(textDocumentContentProvider);

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'c6510' }],
		middleware: {
			provideCompletionItem: async (document, position, context, token, next) => {
				const originalUri = document.uri.toString();

				let documentText = document.getText()
				let tree = parser.parse(documentText);
				///let tree = trees.get(originalUri);
				let node;

				if (!tree || !(node = insideScript(tree, position))) {
					return await next(document, position, context, token);
				}

				let type = getScriptType(node);
				let ext = getScriptFileExt(type);
				virtualDocumentContents.set(originalUri, getScriptVirtualContent(type, tree, document));

				const vdocUriString = `c6510-embedded-content://${type}/${encodeURIComponent(originalUri)}.${ext}`;
				const vdocUri = vscode.Uri.parse(vdocUriString);

				onDidChangeEmitter.fire(vdocUri);

				return await vscode.commands.executeCommand<vscode.CompletionList>(
					'vscode.executeCompletionItemProvider',
					vdocUri,
					position,
					context.triggerCharacter
				);
			},

			provideHover: async (document, position, token, next) => {
				const originalUri = document.uri.toString();

				let documentText = document.getText()
				let tree = parser.parse(documentText);
				///let tree = trees.get(originalUri);
				let node;

				if (!tree || !(node = insideScript(tree, position))) {
					return await next(document, position, token);
				}

				let type = getScriptType(node);
				let ext = getScriptFileExt(type);
				virtualDocumentContents.set(originalUri, getScriptVirtualContent(type, tree, document));

				const vdocUriString = `c6510-embedded-content://${type}/${encodeURIComponent(originalUri)}.${ext}`;
				const vdocUri = vscode.Uri.parse(vdocUriString);

				onDidChangeEmitter.fire(vdocUri);

				//
				// This will return an array of Hover instances, according to the documentation. The
				// typescript compiler disagrees and consider the returned type to be a Hover instance,
				// but under the hood it seems like it is a javascript object that contains one member
				// with key '0', i.e. an array like object.
				//
				let result = await vscode.commands.executeCommand<vscode.Hover>(
					'vscode.executeHoverProvider',
					vdocUri,
					position
				);

				//
				// Extract the first member, if there is one. The command invocation above will return an
				// array like object, but we cannot return that as-is. It will only work if we return one
				// instance and not an array of instances.
				//
				if (Object.keys(result).length > 0) {
					return Object.values(result)[0];
				}

				return null;
			},
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export async function activate(context: vscode.ExtensionContext) {
	
	let langFile = path.join(__dirname, '../tree-sitter-c6510.wasm');
	await Parser.init();
	parser = new Parser();
	lang = await Parser.Language.load(langFile);
	parser.setLanguage(lang);

	function initOutput() {
		let asm = vscode.workspace.getConfiguration('c6510-asm.assembler');

		if (!outputChannel)
			outputChannel = vscode.window.createOutputChannel("c6510 Asm");

		if (asm.get<boolean>('clearPreviousOutput'))
			outputChannel.clear();

		outputChannel.show(true);
	}

	function getDocPath(): string | undefined {
		let textEditor = vscode.window.activeTextEditor;
		if (!textEditor)
			return;

		return textEditor.document.uri.fsPath;
	}

	function getOutputPath(docDir: string): string {
		let option = vscode.workspace.getConfiguration('c6510-asm.assembler.option');

		let outputFile = option.get<string>('outputFile');
		if (!outputFile)
			outputFile = "program.prg";

		let outputPath = outputFile;
		if (!path.isAbsolute(outputFile))
			outputPath = path.join(docDir, outputFile);

		return outputPath;
	}

	async function buildCurrent() {
		let asm = vscode.workspace.getConfiguration('c6510-asm.assembler');
		let option = vscode.workspace.getConfiguration('c6510-asm.assembler.option');

		let executablePath = asm.get<string>('executablePath');
		if (!executablePath)
			executablePath = 'c6510'

		let includes = '';
		let includePaths = asm.get<string[]>('includePaths');
		if (includePaths)
		{
			includePaths.forEach(path => {
				includes += " -p " + path;
			});
		}

		let presets = '';
		let presetDefs = option.get<string[]>('presetDefines');
		if (presetDefs)
		{
			presetDefs.forEach(pdef => {
				presets += " -d " + pdef;
			});
		}

		let additionals = '';
		let additionalSources = option.get<string[]>('additionalSources');
		if (additionalSources)
		{
			additionalSources.forEach(src => {
				additionals += " -i " + src;
			});
		}

		let docPath = getDocPath();
		if (!docPath)
			return;

		let docDir = path.dirname(docPath);
		let outputPath = getOutputPath(docDir);

		let symbolPath = '';
		let symbolFile = option.get<string>('symbolFile');
		if (symbolFile)
		{
			symbolPath = symbolFile;
			if (!path.isAbsolute(symbolFile))
				symbolPath = path.join(docDir, symbolFile);
		}

		let sourceFile = path.basename(docPath);

		let cmd = asm.get<string>('commandLine');
		if (!cmd) {
			outputChannel.append("[Error] no command line format configured");
			return;
		}

		// Replace placeholder variables.
		cmd = cmd.replace(/\${executablePath}/g, executablePath);
		cmd = cmd.replace(/\${includes}/g, includes);
		cmd = cmd.replace(/\${presets}/g, presets);
		cmd = cmd.replace(/\${additionals}/g, additionals);
		cmd = cmd.replace(/\${symbolPath}/g, symbolPath);
		cmd = cmd.replace(/\${outputPath}/g, outputPath);
		cmd = cmd.replace(/\${sourceFile}/g, sourceFile);

		outputChannel.appendLine("[Running] " + cmd);

		let startTime = new Date();

		let options:cp.SpawnOptions = { cwd: docDir, shell: true };
		let child = cp.spawn(cmd, [], options);

		child.stdout?.on('data', (data) => {
			// Print output from command in Debug Console view of debugging window.
			console.log(data.toString('utf8'));

			// Print output from command in Output view of debugee/normal window.
			outputChannel.append(data.toString('utf8'));
		});

		child.stderr?.on('data', (data) => {
			console.error(data.toString('utf8'));
			outputChannel.append(data.toString('utf8'));
		});

		//
		// This promise is fullfilled once the 'close' event on the child fires and thus resolves it.
		// Until then the code following will not be executed since we 'await' the promise making this
		// code synchronous in an asynchronouse way without blocking Node.js event loop.
		//
		let code = await new Promise((resolve, reject) => {
			child.on('close', resolve);
		});

		let endTime = new Date();
		let t = (endTime.getTime() - startTime.getTime()) / 1000;

		outputChannel.appendLine("[Done] exited with code " + code + " in " + t + " seconds");

		return code;
	};

	async function runCurrent() {
		let emu = vscode.workspace.getConfiguration('c6510-asm.emulator');

		let docPath = getDocPath();
		if (!docPath)
			return;

		let docDir = path.dirname(docPath);
		let outputPath = getOutputPath(docDir);

		let cmd = emu.get<string>('commandLine');
		if (!cmd)
			return;

		cmd = cmd.replace(/\${outputPath}/g, outputPath);

		let command;
		let platform = os.platform();

		// Specify the command line to run w/o buffering stdout and stderr.
		if (platform == 'linux')
			command = 'script -q -c "' + cmd + '" /dev/null';
		else if (platform == 'darwin')
			command = 'script -q /dev/null ' + cmd;
		else
			command = cmd;

		outputChannel.appendLine("[Running] " + cmd);

		let options:cp.SpawnOptions = { cwd: docDir, shell: true };
		let child = cp.spawn(command, [], options);

		child.stdout?.on('data', (data) => {
			outputChannel.append(data.toString('utf8'));
		});

		child.stderr?.on('data', (data) => {
			outputChannel.append(data.toString('utf8'));
		});

		let code = await new Promise((resolve, reject) => {
			child.on('close', resolve);
		});

		outputChannel.appendLine('[Done] exited with code ' + code);

		return code;
	};

	let buildCurrentCmd = vscode.commands.registerCommand('c6510-asm.buildCurrent', async () => {
		initOutput();
		await buildCurrent();
	});
	context.subscriptions.push(buildCurrentCmd);

	let buildAndRunCurrentCmd = vscode.commands.registerCommand('c6510-asm.buildAndRunCurrent', async () => {
		initOutput();
		let buildResult = await buildCurrent();
		if (buildResult == 0)
			await runCurrent();
	});
	context.subscriptions.push(buildAndRunCurrentCmd);

	let hoverProvider = vscode.languages.registerHoverProvider('c6510', {
		provideHover(document, position, token): vscode.ProviderResult<vscode.Hover>
		{
			let word = document.getText(document.getWordRangeAtPosition(position, /[\w$%]+/));
			let help = helpTexts[word.toLowerCase()];

			if (!help)
			{
				let m,v;
				let dec,hex,bin;

				// Check if we can match the word as a number instead.
				if (m = word.match(/^([0-9]+)$/))
				{
					v = parseInt(m[1], 10);
					dec = v.toString(10);
					hex = v.toString(16);
					bin = v.toString(2);
				}
				else if (m = word.match(/^\$([0-9a-fA-F]+)$/))
				{
					v = parseInt(m[1], 16);
					dec = v.toString(10);
					hex = v.toString(16);
					bin = v.toString(2);
				}
				else if (m = word.match(/^%([01]+)$/))
				{
					v = parseInt(m[1], 2);
					dec = v.toString(10);
					hex = v.toString(16);
					bin = v.toString(2);
				}
				else
					return null;

				help = " * Dec: `" + dec + "`  \n" +
				       " * Hex: `$" + hex + "`  \n" +
					   " * Bin: `%" + bin + "`  \n";
			}

			let markdown = new vscode.MarkdownString();
			markdown.appendMarkdown(help);
			return new vscode.Hover(markdown);
		}
	});

	let definitionProvider = vscode.languages.registerDefinitionProvider('c6510', {
		async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Definition|vscode.DefinitionLink[]>
		{
			let word = document.getText(document.getWordRangeAtPosition(position, /[a-zA-Z_\.@]([a-zA-Z_\.@0-9:]*[a-zA-Z_\.@0-9])*/));
			let tree = parser.parse(document.getText());

			includeSearchPaths = await getIncludePaths(document);

			// Check if this word is inside a macro definition and if so if it is one of the parameters.
			let pointNode = tree.rootNode.descendantForPosition({ row: position.line, column: position.character });
			let macroNode = insideMacro(pointNode);
			if (macroNode)
			{
				let macroPattern = '(identifier_bitwidth (identifier) @id)';
				let macroQuery = lang.query(macroPattern);
				let macroMatches = macroQuery.matches(macroNode);
				for (let i=0 ; i<macroMatches.length ; i++)
				{
					let node = macroMatches[i].captures[0].node;
					if (node.text == word)
					{
						let location = new vscode.Location(document.uri, new vscode.Position(node.startPosition.row, node.startPosition.column));
						return [location];
					}
				}
			}

			let pattern1 = '(variable_definition name:(identifier) @id0)';
			let pattern2 = '(assignment_expression name:(identifier) @id1)';
			let pattern3 = '(label) @id2';
			let pattern4 = '(macro_definition name:(identifier) @id3)'
			let patterns = pattern1 + pattern2 + pattern3 + pattern4;
			let definitionQuery = lang.query(patterns);

			let includePattern = '(include_source path:[(identifier) (string)] @id1)';
			let includeQuery = lang.query(includePattern);

			visitedPaths = [];

			return await getDefinitions(definitionQuery, includeQuery, document.uri, tree, word, position);
		}
	});

	context.subscriptions.push(hoverProvider);
	context.subscriptions.push(definitionProvider);

	// trees = new Map<string, Parser.Tree>();

	// function checkAndParseDocument(document: vscode.TextDocument) {
	// 	if (document.languageId === 'c6510') {
	// 		console.log("Checking c6510 document");
	// 		let uri = document.uri.toString();
	// 		let tree = trees.get(uri);
	// 		if (!tree) {
	// 			console.log("Parsing document");
	// 			tree = parser.parse(document.getText())
	// 			trees.set(uri, tree)
	// 		}
	// 	}
	// }

	// // Make sure we parse any existing document in an active text editor when extension is activated.
	// if (vscode.window.activeTextEditor) {
	// 	let e = vscode.window.activeTextEditor;
	// 	console.log("Active text editor");
	// 	console.log(" URI: " + e.document.uri.toString());
	// 	console.log(" LanguageID: " + e.document.languageId);
	// 	checkAndParseDocument(e.document);
	// }

	// let activeTextEditorHandler = vscode.window.onDidChangeActiveTextEditor((e: vscode.TextEditor | undefined) => {
	// 	if (e) {
	// 		console.log("Changed active text editor");
	// 		console.log(" URI: " + e.document.uri.toString());
	// 		console.log(" LanguageID: " + e.document.languageId);

	// 		checkAndParseDocument(e.document);
	// 	}
	// });
	// context.subscriptions.push(activeTextEditorHandler);

	// let changeTextDocumentHandler = vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
	// 	let uri = e.document.uri.toString();
	// 	let tree = trees.get(uri);
	// 	if (tree) {
	// 		//console.log("Updating document");
	// 		e.contentChanges.forEach(c => {
	// 			let edit: Parser.Edit;
	// 			let ss = c.text.split("\n");
	// 			let newEndRow = c.range.start.line + ss.length-1;
	// 			let newEndCol;
	// 			if (ss.length == 1)
	// 				newEndCol = c.range.start.character + c.text.length;
	// 			else
	// 				newEndCol = ss[ss.length-1].length;
	// 			edit = {
	// 				startIndex: c.rangeOffset,
	// 				oldEndIndex: c.rangeOffset + c.rangeLength,
	// 				newEndIndex: c.rangeOffset + c.text.length,
	// 				startPosition: { column: c.range.start.character, row: c.range.start.line },
	// 				oldEndPosition: { column: c.range.end.character, row: c.range.end.line },
	// 				newEndPosition: { column: newEndCol, row: newEndRow }
	// 			};
	// 			//console.log(" New text: " + c.text);
	// 			tree?.edit(edit);
	// 			tree = parser.parse(e.document.getText(), tree);
	// 			if (tree)
	// 				trees.set(uri, tree);
	// 		});
	// 	}
	// });
	// context.subscriptions.push(changeTextDocumentHandler);

	startClient(context);
}

function getScriptVirtualContent(scriptType: string, tree: Parser.Tree, document: vscode.TextDocument)
{
	let pattern = '(script type:(type) @t content:(content [(script_line) (script_statements)] @c))';
	let query = lang.query(pattern);
	let matches = query.matches(tree.rootNode);

	let documentText = document.getText();
	let content = documentText.split('\n').map(line => { return ' '.repeat(line.length); }).join('\n');

	matches.forEach(m => {
		if (m.captures[0].node.text === scriptType)
		{
			let startIndex = m.captures[1].node.startIndex;
			let endIndex = m.captures[1].node.endIndex;
			content = content.slice(0, startIndex) + documentText.slice(startIndex, endIndex) + content.slice(endIndex);
		}
	});

	content = content.replace(/##@/g, "org");
	content = content.replace(/##/g, "__");

	return content;
}

async function getDefinitions(definitionQuery: Parser.Query, includeQuery: Parser.Query, documentUri: vscode.Uri, tree: Parser.Tree, word: string, position?: vscode.Position): Promise<any[]>
{
	let definitionMatches = definitionQuery.matches(tree.rootNode);
	let result = [];

	visitedPaths.push(documentUri.toString(true));

	for (let i=0 ; i<definitionMatches.length ; i++)
	{
		let node = definitionMatches[i].captures[0].node;
		let text = node.text;
		let pattern = definitionMatches[i].pattern;

		// Remove ending colon in case the match capture is a label
		if (node.type == 'label')
			text = text.slice(0,-1)

		//
		// Only 'variable_definition', 'assignment_expression' and 'label' can have local identifiers
		// where we have to locate the global label to create the canonical name.
		//
		if (pattern <= 2)
		{
			if (text.startsWith('.'))
			{
				if (position && word.startsWith('.'))
				{
					// Check if the local name we look for is within the current local label's scope.
					let range = getScopeRange(node, tree.rootNode);
					if (!range.contains(position))
						continue;
				}
				else
				{
					// Get the current local name's canonical name.
					let startNode = getPreviousGlobalLabel(node);
					if (!startNode)
						continue;

					text = startNode.text + text;
				}
			}
		}

		if (text == word) {
			let location = new vscode.Location(documentUri, new vscode.Position(node.startPosition.row, node.startPosition.column));
			result.push(location);
		}
	}

	//
	// Start with directory of current document before any other specified directory in include search path.
	// The current document may include files relative itself.
	//
	let searchPaths: vscode.Uri[] = [];
	searchPaths.push(vscode.Uri.joinPath(documentUri, "../"));
	searchPaths = searchPaths.concat(includeSearchPaths);

	let includeMatches = includeQuery.matches(tree.rootNode);

	for (let i=0 ; i<includeMatches.length ; i++)
	{
		// Get file path and remove any surrounding double-quotes.
		let filePath = includeMatches[i].captures[0].node.text.replace(/^"(.+(?="$))"$/, '$1');

		for (let j=0 ; j<searchPaths.length ; j++)
		{
			try {
				let fileUri = vscode.Uri.joinPath(searchPaths[j], filePath);
				if (visitedPaths.indexOf(fileUri.toString(true)) == -1)
				{
					let fileContent = (await vscode.workspace.fs.readFile(fileUri)).toString();	// throws exception if file cannot be read
					let fileTree = parser.parse(fileContent);

					let fileResult = await getDefinitions(definitionQuery, includeQuery, fileUri, fileTree, word);

					result = result.concat(fileResult);
				}
			}
			catch (error)
			{
			}
		}
	}

	return result;
}

async function getIncludePaths(document: vscode.TextDocument): Promise<vscode.Uri[]>
{
	let result: vscode.Uri[] = [];
	let conf = vscode.workspace.getConfiguration('c6510-asm');
	let asm = vscode.workspace.getConfiguration('c6510-asm.assembler');

	let globalPaths = asm.get<string[]>('includePaths');
	if (globalPaths)
	{
		globalPaths.forEach((p : string) =>
		{
			let uri = vscode.Uri.file(p);
			result.push(uri);
		});
	}

	let buildFile = conf.get<string>('buildFile');
	if (buildFile)
	{
		let buildFileUri = vscode.Uri.joinPath(document.uri, "../" + buildFile);
		try {

			//
			// Let's read the file explicitly as only containing JSON. If we were to use:
			//
			//   let json = require(uri.fsPath);
			//
			// Then the content would be interpreted as JavaScript potentially executing unwanted code.
			//

			let content = (await vscode.workspace.fs.readFile(buildFileUri)).toString();
			let json = JSON.parse(content);
			let paths = json['includePaths'];
			if (paths)
			{
				paths.forEach((p : string) =>
				{
					if (path.isAbsolute(p))
					{
						// Treat absolute path as a local file (with URI scheme 'file://').
						let uri = vscode.Uri.file(p);
						result.push(uri);
					}
					else
					{
						// Treat a relative path as relative the build file's location (possibly other URI scheme than 'file://').
						let uri = vscode.Uri.joinPath(buildFileUri, "../" + p)
						result.push(uri);
					}
				});
			}
		}
		catch(error)
		{
		}
	}

	return result;
}

function getScriptFileExt(type: string)
{
	if (type === 'lua')
		return 'lua';
	else if (type === 'sq')
		return 'nut'
	else
		return 'unknown'
}

function getScriptType(node: Parser.SyntaxNode): string
{
	for (let i=0 ; i<node.childCount ; i++) {
		if (node.children[i].type === 'type')
			return node.children[i].text;
	}
	return '';
}

function insideScript(tree: Parser.Tree, position: vscode.Position): Parser.SyntaxNode | null
{
	let node = tree.rootNode.descendantForPosition({ row: position.line, column: position.character });

	if (!node) {
		return null;
	}

	while (node.parent)
	{
		node = node.parent;
		if (node.type == 'script')
			return node;
	}

	return null;
}

function insideMacro(node: Parser.SyntaxNode): Parser.SyntaxNode | null
{
	while (node.parent)
	{
		node = node.parent;
		if (node.type == 'macro_definition')
			return node;
	}
	return null;
}

function getPreviousGlobalLabel(node: Parser.SyntaxNode): Parser.SyntaxNode | null
{
	do
	{
		let n = getScopeStart(node);
		if (n)
			return n;
		if (!node.parent)
			return null;
		node = node.parent;
	} while (node.type != 'macro_definition')
	return null;
}

function getNextGlobalLabel(node: Parser.SyntaxNode): Parser.SyntaxNode | null
{
	do
	{
		let n = getScopeEnd(node);
		if (n)
			return n;
		if (!node.parent)
			return null;
		node = node.parent;
	} while (node.type != 'macro_definition')
	return null;
}

// Finds the previous global label in the same scope level.
function getScopeStart(labelNode: Parser.SyntaxNode): Parser.SyntaxNode | null
{
	let node = labelNode.previousSibling;
	while (node)
	{
		if (node.type == 'label' && !node.text.startsWith('.'))
			return node;
		node = node.previousSibling;
	}
	return null;
}

// Finds the next global label in the same scope level.
function getScopeEnd(labelNode: Parser.SyntaxNode): Parser.SyntaxNode | null
{
	let node = labelNode.nextSibling;
	while (node)
	{
		if (node.type == 'label' && !node.text.startsWith('.'))
			return node;
		node = node.nextSibling;
	}
	return null;
}

// Finds the scope range for a specified local label node.
function getScopeRange(labelNode: Parser.SyntaxNode, rootNode: Parser.SyntaxNode): vscode.Range
{
	let macro = insideMacro(labelNode)

	let startNode = getPreviousGlobalLabel(labelNode);
	if (!startNode)
		startNode = macro ? macro : rootNode;

	let endNode = getNextGlobalLabel(labelNode);
	if (!endNode)
		endNode = macro ? macro : rootNode;

	let startPos = new vscode.Position(startNode.startPosition.row, startNode.startPosition.column);
	let endPos = new vscode.Position(endNode?.endPosition.row, endNode.endPosition.column);

	return new vscode.Range(startPos, endPos);
}

// this method is called when your extension is deactivated
export async function deactivate(): Promise<void> {
	if (client) {
		await client.stop();
		client = undefined;
	}
}
