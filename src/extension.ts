import * as vscode from 'vscode';
import { InferenceService } from './inferenceService';
import { OpenAIService } from './providers/openAIService';
import { HuggingFaceService } from './providers/huggingFaceService';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.runInference', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const fileContent = document.getText();
            const languageId = document.languageId;
            
            const context = determineContext(fileContent, languageId);
            const prompt = generatePrompt(context);

            // Get the user's preferred provider from the settings
            const providerName = vscode.workspace.getConfiguration().get('inference.provider') as string;
            const service = getInferenceService(providerName);

            const response = await service.sendPrompt(prompt);
            vscode.window.showInformationMessage(`Inference Result: ${response}`);
        } else {
            vscode.window.showErrorMessage('No active editor found');
        }
    });

    context.subscriptions.push(disposable);
}

function getInferenceService(provider: string): InferenceService {
    switch (provider) {
        case 'OpenAI':
            return new OpenAIService();
        case 'HuggingFace':
            return new HuggingFaceService();
        default:
            throw new Error(`Unknown provider: ${provider}`);
    }
}

function determineContext(fileContent: string, languageId: string): string {
    if (languageId === 'javascript' || languageId === 'typescript') {
        return 'JavaScript/TypeScript code analysis';
    } else if (fileContent.includes('def')) {
        return 'Python function analysis';
    } else {
        return 'General file context';
    }
}

function generatePrompt(context: string): string {
    if (context.includes('JavaScript')) {
        return 'Analyze this JavaScript code for potential issues and suggest improvements.';
    } else if (context.includes('Python')) {
        return 'Analyze this Python function and suggest optimization.';
    } else {
        return 'Provide insights based on the file content.';
    }
}

export function deactivate() {}
