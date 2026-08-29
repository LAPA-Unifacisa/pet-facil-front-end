import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-3.6-flash';
const TIMEOUT_MS = 15000;

const SYSTEM_PROMPT =
  'Você é o assistente virtual do PetFacil, um aplicativo de pet shop. ' +
  'Responda em português, de forma simpática e objetiva, sobre produtos do catálogo, ' +
  'pedidos, pets cadastrados, agendamentos de serviços e dúvidas gerais sobre cuidados com animais de estimação.';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const FALLBACK_MESSAGE = 'Não consegui responder agora. Tente novamente em instantes.';

export async function sendMessageToAssistant(
  history: ChatMessage[],
  message: string,
): Promise<string> {
  if (!API_KEY) {
    return 'O assistente está indisponível no momento.';
  }

  try {
    const client = new GoogleGenerativeAI(API_KEY);
    const model = client.getGenerativeModel({ model: MODEL_NAME, systemInstruction: SYSTEM_PROMPT });

    const firstUserIndex = history.findIndex((item) => item.role === 'user');
    const apiHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

    const chat = model.startChat({
      history: apiHistory.map((item) => ({ role: item.role, parts: [{ text: item.text }] })),
    });

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS);
    });

    const result = await Promise.race([chat.sendMessage(message), timeout]);
    return result.response.text() || FALLBACK_MESSAGE;
  } catch (error) {
    console.warn('[gemini] falha ao consultar o assistente:', error);
    return FALLBACK_MESSAGE;
  }
}
