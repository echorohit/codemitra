import * as vscode from 'vscode';
import { updateStatusBarItem } from '../utils/updateStatusBar';

export async function changeProvider(statusBarItem: vscode.StatusBarItem) {
    const newProvider = await vscode.window.showQuickPick(['OpenAI', 'SambaNova', 'Groq'], {
        placeHolder: 'Choose the inference provider'
    });

    if (newProvider) {
        await vscode.workspace.getConfiguration().update('inference.provider', newProvider, vscode.ConfigurationTarget.Global);
        updateStatusBarItem(statusBarItem);
    }
}
