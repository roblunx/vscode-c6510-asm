
import { createConnection, InitializeParams, TextDocuments, TextDocumentSyncKind } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Create a connection for the server. The connection uses Node's IPC as a transport.
const connection = createConnection();

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((_params: InitializeParams) => {
	return {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Full,
			// Tell the client that the server supports code completion
			completionProvider: {
				resolveProvider: true
			},
			hoverProvider: true,
		}
	};
});

connection.onCompletion(async (textDocumentPosition, token) => {
	return null;

	// Keeping the commented out code below for possible future additions.

	// const document = documents.get(textDocumentPosition.textDocument.uri);
	// if (!document) {
	// 	return null;
	// }
});

// Without this completions won't work.
connection.onCompletionResolve(item => item);

connection.onHover(async (params, token) => {
	return null;
});

documents.listen(connection);
connection.listen();