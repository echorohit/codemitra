import * as vscode from 'vscode';
import { configureApiKey } from './commands/configureApiKey';
import { runInference } from './commands/runInference';
import { changeProvider } from './commands/changeProvider';
import { updateStatusBarItem } from './utils/updateStatusBar';

export function activate(context: vscode.ExtensionContext) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.command = 'extension.changeProvider';
    updateStatusBarItem(statusBarItem);

    // Register the command to run inference
    let runInferenceDisposable = vscode.commands.registerCommand('extension.runInference', runInference);

    // Register the command to configure API keys
    let configureApiKeyDisposable = vscode.commands.registerCommand('extension.configureApiKey', configureApiKey);

    // Register the command to change the provider
    let changeProviderDisposable = vscode.commands.registerCommand('extension.changeProvider', () => changeProvider(statusBarItem));

    // Add the status bar item to the subscriptions
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(runInferenceDisposable);
    context.subscriptions.push(configureApiKeyDisposable);
    context.subscriptions.push(changeProviderDisposable);
}

export function deactivate() {}
