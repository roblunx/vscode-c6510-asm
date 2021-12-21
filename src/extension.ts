// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {opcodes} from './opcodes';
import {illegalOpcodes} from './illegal-opcodes';
import {vicregs} from './vic-regs';
import {sidregs} from './sid-regs';
import {cia1regs} from './cia1-regs';
import {cia2regs} from './cia2-regs';
import * as Parser from 'web-tree-sitter';
import * as path from 'path';


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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	let langFile = path.join(__dirname, '../tree-sitter-c6510.wasm');
	await Parser.init();
	parser = new Parser();
	lang = await Parser.Language.load(langFile);
	parser.setLanguage(lang);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "c6510-asm" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('c6510-asm.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from c6510-Assembler!');
	});

	context.subscriptions.push(disposable);

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

		// Remove ending colon in case the match capture is a label
		if (node.type == 'label')
		{
			if (text.startsWith('.'))
			{
				if (position && word.startsWith('.'))
				{
					// Check if the local name we look for is within the current local label's scope.
					let range = getScopeRange(node);
					if (!range.contains(position))
						continue;
				}
				else
				{
					// Get the current local label's canonical name to compare with the canonical name we look for.
					let startNode = getScopeStart(node);
					if (!startNode || startNode.type != 'label')
						continue;
					text = startNode.text + text;
				}
			}
			text = text.slice(0,-1)
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
	let conf = vscode.workspace.getConfiguration('c6510');

	let globalPaths = conf.get<string[]>('includePaths');
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

// Finds the scope range for a specified local label node.
function getScopeRange(labelNode: Parser.SyntaxNode): vscode.Range
{
	let macro = insideMacro(labelNode)
	if (macro)
	{
		let startPos = new vscode.Position(macro.startPosition.row, macro.startPosition.column);
		let endPos = new vscode.Position(macro.endPosition.row, macro.endPosition.column);
		return new vscode.Range(startPos, endPos);
	}

	// Find previous global label
	let startNode = labelNode;
	let node = labelNode.previousSibling;
	while (node)
	{
		startNode = node;
		if (node.type == 'label' && !node.text.startsWith('.'))
			break;
		node = node.previousSibling;
	}

	// Find next global label
	let endNode = labelNode;
	node = labelNode.nextSibling;
	while (node)
	{
		endNode = node;
		if (node.type == 'label' && !node.text.startsWith('.'))
			break;
		node = node.nextSibling;
	}

	let startPos = new vscode.Position(startNode.startPosition.row, startNode.startPosition.column);
	let endPos = new vscode.Position(endNode?.endPosition.row, endNode.endPosition.column);

	return new vscode.Range(startPos, endPos);
}

// this method is called when your extension is deactivated
export function deactivate() {}
