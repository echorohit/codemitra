import * as vscode from 'vscode';
import { getApiKey } from '../utils/getApiKey';
import { determineContext } from '../utils/determineContext';
import { generatePrompt } from '../utils/generatePrompt';
import { getInferenceService } from '../services'; 
import { outputChannel, clearOutput, logToOutput } from '../utils/outputChannel';  // Reuse the same output channel

export async function runInference() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;  // Early exit if there's no active editor
    }

    const document = editor.document;
    const fileContent = document.getText();
    const languageId = document.languageId;

    if (!fileContent) {
        vscode.window.showErrorMessage('The file is empty or file content is undefined.');
        return;  // Early exit if the file content is empty
    }

    // Clear previous output logs and log the process
    clearOutput();
    logToOutput(`Starting inference for ${languageId} file...`);

    const context = determineContext(fileContent, languageId);
    const prompt = generatePrompt(context, fileContent);

    // Log generated prompt for debugging purposes
    logToOutput(`Generated Prompt:\n${prompt}`);

    const providerName = vscode.workspace.getConfiguration().get('inference.provider') as string;
    const apiKey = getApiKey(providerName);

    if (!apiKey) {
        vscode.window.showErrorMessage(`API key for ${providerName} is missing.`);
        return;  // Early exit if API key is missing
    }

    logToOutput(`Using ${providerName} provider...`);

    try {
        const service = getInferenceService(providerName, apiKey);
        outputChannel.appendLine(`Sending prompt to ${providerName}...`);

        const response = await service.sendPrompt(prompt);

        // Log the response and show it to the user
        logToOutput(`Response from ${providerName}:\n${response}`);
        vscode.window.showInformationMessage(`Inference Result: Check the "Inference Results" output for details.`);
    } catch (error) {
        const typedError = error as Error;
        logToOutput(`Error while sending prompt to ${providerName}: ${typedError.message}`);
        vscode.window.showErrorMessage(`Error: ${typedError.message}`);
    }
}
