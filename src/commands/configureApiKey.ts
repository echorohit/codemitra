import * as vscode from 'vscode';

export async function configureApiKey() {
    const provider = await vscode.window.showQuickPick(['OpenAI', 'SambaNova', 'Groq'], {
        placeHolder: 'Choose the provider to configure API key for'
    });

    if (provider) {
        const apiKey = await vscode.window.showInputBox({
            prompt: `Enter your API key for ${provider}`,
            ignoreFocusOut: true,
            password: true
        });

        if (apiKey) {
            vscode.workspace.getConfiguration().update(`${provider.toLowerCase()}.apiKey`, apiKey, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`${provider} API key has been configured!`);
        } else {
            vscode.window.showErrorMessage('API key configuration cancelled.');
        }
    }
}
