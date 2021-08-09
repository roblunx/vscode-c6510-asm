// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {opcodes} from './opcodes';
import {illegalOpcodes} from './illegal-opcodes';
import {vicregs} from './vic-regs';
import {sidregs} from './sid-regs';
import {cia1regs} from './cia1-regs';
import {cia2regs} from './cia2-regs';


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
export function activate(context: vscode.ExtensionContext) {
	
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
	context.subscriptions.push(hoverProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {}
