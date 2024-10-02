import * as vscode from 'vscode';

export function updateStatusBarItem(statusBarItem: vscode.StatusBarItem) {
    const provider = vscode.workspace.getConfiguration().get('inference.provider') as string;
    statusBarItem.text = `$(server) ${provider}`;
    statusBarItem.show();
}
