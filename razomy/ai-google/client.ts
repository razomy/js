import {GoogleGenAI} from "@google/genai";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GEMINI_API_KEY: string;
    }
  }
}

export const CLIENT = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
export const MODELS = {
  cheap: 'gemini-3.1-flash-lite-preview',
  expensive: 'gemini-3.1-pro-preview',
};
