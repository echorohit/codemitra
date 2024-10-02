import axios, { AxiosInstance } from 'axios';
import { InferenceService } from './inferenceService';

export abstract class InferenceServiceBase implements InferenceService {
    protected axiosInstance: AxiosInstance;

    constructor(baseURL: string, apiKey: string) {
        if (!apiKey) {
            throw new Error('API key is missing.');
        }

        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

         // Add request logging
         this.axiosInstance.interceptors.request.use(request => {
            console.log('Starting Request:', request);
            return request;
        });

        // Add response logging
        this.axiosInstance.interceptors.response.use(response => {
            console.log('Response:', response);
            return response;
        }, error => {
            console.error('Error Response:', error.response ? error.response.data : error.message);
            return Promise.reject(error);
        });
    }

    // Abstract method that child classes must implement
    abstract sendPrompt(prompt: string): Promise<string>;
}
