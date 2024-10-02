import { InferenceService } from './interface.inferenceService';
import { InferenceServiceBase } from './infererenceServiceBase';

export class SambaNovaService extends InferenceServiceBase {
    constructor(apiKey: string) {
        super('https://api.sambanova.ai/v1', apiKey);  // Base URL for OpenAI API
    }

    async sendPrompt(userInput: string): Promise<string> {
        try {

            const prompt = this.formatSambaNovaPrompt(userInput);
            const response = await this.axiosInstance.post('/chat/completions', {
                "model": 'Meta-Llama-3.2-1B-Instruct',  // Specify the OpenAI model
                "messages": prompt, // Fix this
                "max_tokens": 100,
            });

            // Manually log a cURL command for debugging
            const curlCommand = `curl -X POST 'https://api.sambanova.ai/v1/chat/completions' \
                -H 'Authorization: Bearer ${process.env.SAMBANOVA_API_KEY}' \
                -H 'Content-Type: application/json' \
                -d '${JSON.stringify(prompt)}'`;
            
            console.log('cURL Command:', curlCommand);

            return response.data.choices[0].message.content.trim();  // Get the result from the first choice
        } catch (error) {
            console.error('SambaNova API error:', error);
            throw new Error('Failed to fetch response from SambaNova API');
        }
    }

    formatSambaNovaPrompt(userInput: string): any {
        return[
                {
                    role: 'system',
                    content: 'You are a coding assistant who helps with code generation, debugging, and providing programming advice.'
                },
                {
                    role: 'user',
                    content: userInput
                }
            ];
    }
}