import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export async function generateProjectSummary(brief: string): Promise<string> {
  const geminiKey = env.GEMINI_API_KEY;
  if (!geminiKey) {
    // Return a mocked summary
    return `[Mock AI Summary] The project appears to be a high-end application requiring customizable features. Recommended Stack: React/Next.js + Node.js. Development timeline estimated at 4-6 weeks with low to moderate deployment risks.`;
  }

  try {
    const ai = new GoogleGenerativeAI(geminiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a Principal Product Lead at Nexus Web Agency. Analyze this client brief: "${brief}". Provide a concise technical summary, primary recommended technology stack, and initial timeline feasibility in exactly 3 sentences.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (e: any) {
    logger.error('❌ Gemini API Summary generation failed:', e.message);
    return `Failed to generate AI summary. Brief context: ${brief.slice(0, 100)}...`;
  }
}
