import { InferenceService } from './interface.inferenceService';
import { InferenceServiceBase } from './infererenceServiceBase';

export class GroqService extends InferenceServiceBase {
    constructor(apiKey: string) {
        super('https://api.groq.com/openai/v1', apiKey);  // Base URL for OpenAI API
    }

    async sendPrompt(prompt: string): Promise<string> {
        try {
            const response = await this.axiosInstance.post('/chat/completions', {
                model: 'llama3-8b-8192',  // Specify the OpenAI model
                prompt: prompt, // Fix this
                max_tokens: 100
            });

            return response.data.choices[0].text.trim();  // Get the result from the first choice
        } catch (error) {
            console.error('Groq API error:', error);
            throw new Error('Failed to fetch response from Groq API');
        }
    }
}