import * as vscode from 'vscode';
import * as crypto from 'crypto';

async function generateChecksum(uri: vscode.Uri, type: string) {
    const fileContent = await vscode.workspace.fs.readFile(uri);
    const checksum = crypto.createHash(type).update(fileContent).digest('hex');
    vscode.env.clipboard.writeText(checksum);
}

function activate(context: vscode.ExtensionContext) {

    const sha256Copy = vscode.commands.registerCommand('jcarchives.checksum-plugin.copySha256', async () => {
        const textEditor = vscode.window.activeTextEditor;
        if (!textEditor) return;

        const uri = textEditor.document.uri;
        await generateChecksum(uri, 'sha256');
        vscode.window.showInformationMessage(`SHA-256 checksum copied to clipboard.`);
    });

    const sha512Copy = vscode.commands.registerCommand('jcarchives.checksum-plugin.copySha512', async () => {
        const textEditor = vscode.window.activeTextEditor;
        if (!textEditor) return;

        const uri = textEditor.document.uri;
        await generateChecksum(uri, 'sha512');
        vscode.window.showInformationMessage(`SHA-512checksum copied to clipboard.`);
    });

    context.subscriptions.push(sha256Copy, sha512Copy);
}

exports.activate = activate;

