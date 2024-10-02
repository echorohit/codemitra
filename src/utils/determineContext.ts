export function determineContext(fileContent: string, languageId: string): string {
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
