import * as vscode from 'vscode';
import { InferenceService } from './inferenceService';
import { OpenAIService } from './providers/openAIService';
import { SambaNovaService } from './providers/sambanovaService';
import { GroqService } from './providers/groqService';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runInference', async () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            // Extract the file content and log it for debugging
            const document = editor.document;
            const fileContent = document.getText();
            const languageId = document.languageId;

            console.log('File content extracted:', fileContent);  // Log file content for debugging

            if (!fileContent) {
                vscode.window.showErrorMessage('The file is empty or file content is undefined.');
                return;  // Early exit if the file is empty or content is undefined
            }

            const context = determineContext(fileContent, languageId);
            const prompt = generatePrompt(context, fileContent);

            // Get the user's preferred provider and corresponding API key
            const providerName = vscode.workspace.getConfiguration().get('inference.provider') as string;
            const apiKey = getApiKey(providerName);

            if (!apiKey) {
                return;  // Early exit if API key is missing
            }

            console.log('API Key:', apiKey);  // Logging API key for debugging
            console.log('Prompt:', prompt);  // Log the generated prompt for debugging

            try {
                const service = getInferenceService(providerName, apiKey);
                const response = await service.sendPrompt(prompt);
                vscode.window.showInformationMessage(`Inference Result: ${response}`);
            } catch (error) {
				const typedError = error as Error;  // Cast the error to Error type
                vscode.window.showErrorMessage(`Error sending prompt to ${providerName}: ${typedError.message}`);
            }
        } else {
            vscode.window.showErrorMessage('No active editor found.');
        }
    });

    context.subscriptions.push(disposable);
}

function getInferenceService(provider: string, apiKey: string): InferenceService {
    switch (provider) {
        case 'OpenAI':
            return new OpenAIService(apiKey);
        case 'SambaNova':
            return new SambaNovaService(apiKey);
        case 'Groq':
            return new GroqService(apiKey);
        default:
            throw new Error(`Unknown provider: ${provider}`);
    }
}

function determineContext(fileContent: string, languageId: string): string {
    if (languageId === 'javascript' || languageId === 'typescript') {
        return 'JavaScript/TypeScript code analysis';
    } else if (languageId === 'python' || fileContent.includes('def')) {
        return 'Python function analysis';
    } else if (languageId === 'html' || fileContent.includes('<html>')) {
        return 'HTML file analysis';
    } else if (languageId === 'json') {
        return 'JSON file analysis';
    } else {
        return 'General file context';
    }
}

function generatePrompt(context: string, fileContent: string): string {
    if (context.includes('JavaScript')) {
        return `You are a coding assistant. Please analyze the following JavaScript code for potential issues and suggest improvements:\n\n${fileContent}`;
    } else if (context.includes('Python')) {
        return `You are a coding assistant. Please analyze the following Python function and suggest optimizations:\n\n${fileContent}`;
    } else if (context.includes('HTML')) {
        return `You are a coding assistant. Please analyze the following HTML code:\n\n${fileContent}`;
    } else if (context.includes('JSON')) {
        return `You are a coding assistant. Please analyze the following JSON structure:\n\n${fileContent}`;
    } else {
        return `You are a coding assistant. Please provide insights based on the following file content:\n\n${fileContent}`;
    }
}

function getApiKey(providerName: string): string {
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
            return '';  // Early exit if the provider is unknown
    }

    if (!apiKey) {
        vscode.window.showErrorMessage(`${providerName} API key is missing.`);
        return '';  // Early exit if API key is missing
    }

    return apiKey;
}

export function deactivate() {}
