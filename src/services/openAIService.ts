import { InferenceService } from './interface.inferenceService';
import { InferenceServiceBase } from './infererenceServiceBase';

export class OpenAIService extends InferenceServiceBase {
    constructor(apiKey: string) {
        super('https://api.openai.com/v1', apiKey);  // Base URL for OpenAI API
    }

    async sendPrompt(prompt: string): Promise<string> {
        try {
            const response = await this.axiosInstance.post('/completions', {
                model: 'text-davinci-003',  // Specify the OpenAI model
                prompt: prompt,
                max_tokens: 100
            });

            return response.data.choices[0].text.trim();  // Get the result from the first choice
        } catch (error) {
            console.error('OpenAI API error:', error);
            throw new Error('Failed to fetch response from OpenAI API');
        }
    }
}