import * as vscode from 'vscode';

export function getApiKey(providerName: string): string {
    let apiKey: string = '';

    switch (providerName) {
        case 'OpenAI':
            apiKey = vscode.workspace.getConfiguration().get('openAi.apiKey') as string;
            break;
        case 'SambaNova':
            apiKey = vscode.workspace.getConfiguration().get('sambaNova.apiKey') as string;
            break;
        case 'Groq':
            apiKey = vscode.workspace.getConfiguration().get('groq.apiKey') as string;
            break;
        default:
            vscode.window.showErrorMessage(`Unknown provider: ${providerName}`);
            return '';
    }

    if (!apiKey) {
        vscode.window.showErrorMessage(`${providerName} API key is missing.`);
        return '';
    }

    return apiKey;
}
