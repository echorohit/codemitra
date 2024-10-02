import { InferenceService } from '../inferenceService';

export class OpenAIService implements InferenceService {
    async sendPrompt(prompt: string): Promise<string> {
        // Replace with actual OpenAI API call
        return `OpenAI response for: ${prompt}`;
    }
}
