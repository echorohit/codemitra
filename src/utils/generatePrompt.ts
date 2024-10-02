export function generatePrompt(context: string, fileContent: string): string {
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
