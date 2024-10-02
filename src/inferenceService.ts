export interface InferenceService {
    sendPrompt(prompt: string): Promise<string>;
}
