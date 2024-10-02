import { InferenceServiceBase } from './infererenceServiceBase';
import { OpenAIService } from './openAIService';
import { SambaNovaService } from './sambanovaService';
import { GroqService } from './groqService';

export function getInferenceService(provider: string, apiKey: string): InferenceServiceBase {
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