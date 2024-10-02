import * as vscode from 'vscode';

// Create a shared output channel for the entire extension
export const outputChannel = vscode.window.createOutputChannel('Inference Results');

// Clear the output channel before each new inference run
export function clearOutput(): void {
    outputChannel.clear();
}

// Log a message to the output channel and show it
export function logToOutput(message: string): void {
    outputChannel.appendLine(message);
    outputChannel.show(true);  // Automatically show the output channel
}
