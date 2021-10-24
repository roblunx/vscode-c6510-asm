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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	let langFile = path.join(__dirname, '../tree-sitter-c6510.wasm');
	await Parser.init();
	const parser = new Parser();
	const lang = await Parser.Language.load(langFile);
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
		provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition|vscode.DefinitionLink[]>
		{
			let word = document.getText(document.getWordRangeAtPosition(position, /[a-zA-Z_\.@]([a-zA-Z_\.@0-9:]*[a-zA-Z_\.@0-9])*/));
			let tree = parser.parse(document.getText());
			let pattern1 = '(variable_definition name:(identifier) @id0)';
			let pattern2 = '(assignment_expression name:(identifier) @id1)';
			let pattern3 = '(label) @id2';
			let pattern4 = '(macro_definition name:(identifier) @id3)'
			let patterns = pattern1 + pattern2 + pattern3 + pattern4;
			let result = [];

			let query = lang.query(patterns);
			let matches = query.matches(tree.rootNode);

			// TODO: handle macro parameters

			for (let i = 0; i < matches.length; i++) {
				let node = matches[i].captures[0].node;
				let text = node.text;

				// Remove ending colon in case the match capture is a label
				if (node.type == 'label') {
					if (text.startsWith('.')) {
						if (word.startsWith('.')) {
							// Check if the local name we look for is within the current local label's scope.
							let range = getScopeRange(node);
							if (!range.contains(position))
								continue;
						}
						else {
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
					let location = new vscode.Location(document.uri, new vscode.Position(node.startPosition.row, node.startPosition.column));
					result.push(location);
				}
			}

			return result;
		}
	});

	context.subscriptions.push(hoverProvider);
	context.subscriptions.push(definitionProvider);
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
