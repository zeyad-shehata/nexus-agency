/**
 * Advanced AI Agent Service
 * Implements intelligent conversation memory, context awareness, and adaptive responses
 * This replaces the basic ai.service.ts with enterprise-grade AI capabilities
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import prisma from '../config/db';

interface ConversationContext {
  projectDetails?: Record<string, any>;
  userPreferences?: Record<string, any>;
  previousTopics?: string[];
  messageCount: number;
  conversationAge: number; // in minutes
}

interface AIResponse {
  content: string;
  confidence: number;
  followUpSuggestions?: string[];
  requiresHumanReview: boolean;
  metadata?: Record<string, any>;
}

class AdvancedAIAgent {
  private apiKey: string;
  private model: any;
  private conversationContextMap: Map<string, ConversationContext> = new Map();
  private responseCache: Map<string, { response: AIResponse; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.apiKey = env.GEMINI_API_KEY || '';
    if (this.apiKey) {
      const ai = new GoogleGenerativeAI(this.apiKey);
      this.model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }
  }

  /**
   * Process user message with full context awareness
   */
  async processMessage(
    userMessage: string,
    conversationId: string,
    userId: string,
    projectId?: string
  ): Promise<AIResponse> {
    try {
      // Check cache first
      const cacheKey = `${conversationId}:${userMessage}`;
      const cached = this.responseCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
        return cached.response;
      }

      // Build conversation context
      const context = await this.buildContext(conversationId, userId, projectId);

      // Fetch message history for context
      const messageHistory = await this.getConversationHistory(conversationId, 10);

      // Generate intelligent response
      const response = await this.generateIntelligentResponse(
        userMessage,
        messageHistory,
        context
      );

      // Cache the response
      this.responseCache.set(cacheKey, {
        response,
        timestamp: Date.now()
      });

      return response;
    } catch (error) {
      logger.error('Advanced AI processing failed:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  /**
   * Generate AI response using Google Generative AI with streaming capability
   */
  async *generateResponseStream(
    userMessage: string,
    conversationId: string,
    userId: string,
    projectId?: string
  ) {
    try {
      const context = await this.buildContext(conversationId, userId, projectId);
      const messageHistory = await this.getConversationHistory(conversationId, 10);
      const systemPrompt = this.buildSystemPrompt(context);
      const conversationPrompt = this.buildConversationPrompt(messageHistory, userMessage);

      const prompt = `${systemPrompt}\n\n${conversationPrompt}`;

      if (!this.model) {
        yield "I appreciate your message, but I'm unable to access the AI model right now. A team member will get back to you shortly!";
        return;
      }

      const result = await this.model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      logger.error('Stream generation failed:', error);
      yield "I apologize, but I encountered an issue processing your message. Our team will assist you shortly.";
    }
  }

  /**
   * Build comprehensive system prompt with context
   */
  private buildSystemPrompt(context: ConversationContext): string {
    return `You are Nexus AI Agent, a professional and intelligent customer support representative for Nexus Web Agency.

Your responsibilities:
1. Provide expert guidance on web development, AI, design, and digital transformation
2. Ask clarifying follow-up questions to better understand client needs
3. Suggest relevant services based on context
4. Maintain conversation memory and reference previous points
5. Adapt your tone to the client's personality
6. Provide specific, actionable recommendations
7. Handle errors gracefully with helpful suggestions
8. Never leave the user without a response or next steps

Context:
- Conversation duration: ${context.conversationAge} minutes
- Messages in this conversation: ${context.messageCount}
- Previous topics discussed: ${context.previousTopics?.join(', ') || 'None yet'}
- ${context.projectDetails ? `Project scope: ${JSON.stringify(context.projectDetails)}` : ''}
- ${context.userPreferences ? `User preferences: ${JSON.stringify(context.userPreferences)}` : ''}

Guidelines:
- Be professional but warm and approachable
- Use clear, concise language
- Provide value in every response
- Ask thoughtful follow-up questions
- Adapt response length to context
- Suggest next steps or relevant resources
- If unsure, admit it and escalate appropriately`;
  }

  /**
   * Build conversation prompt from history
   */
  private buildConversationPrompt(
    history: Array<{ role: string; content: string }>,
    userMessage: string
  ): string {
    const historyText = history
      .map(msg => `${msg.role === 'user' ? 'Client' : 'Agent'}: ${msg.content}`)
      .join('\n');

    return `Conversation history:
${historyText}

Client: ${userMessage}

Please provide a thoughtful, helpful response that:
1. Directly addresses the client's message
2. References relevant context from the conversation
3. Asks clarifying questions if needed
4. Suggests next steps or resources
5. Maintains professional but friendly tone`;
  }

  /**
   * Build conversation context from database
   */
  private async buildContext(
    conversationId: string,
    userId: string,
    projectId?: string
  ): Promise<ConversationContext> {
    try {
      const conversation = await prisma.chatConversation.findUnique({
        where: { id: conversationId },
        include: { project: true, messages: { take: 1 } }
      });

      if (!conversation) {
        return { messageCount: 0, conversationAge: 0 };
      }

      const messageCount = await prisma.chatMessage.count({
        where: { conversationId }
      });

      const createdAt = new Date(conversation.createdAt);
      const conversationAge = Math.floor(
        (Date.now() - createdAt.getTime()) / (1000 * 60)
      );

      return {
        projectDetails: conversation.project ? {
          title: conversation.project.title,
          description: conversation.project.description,
          industry: conversation.project.industry,
          budget: conversation.project.budget,
          timeline: conversation.project.timeline,
          status: conversation.project.status
        } : undefined,
        messageCount,
        conversationAge,
        previousTopics: await this.extractTopics(conversationId)
      };
    } catch (error) {
      logger.error('Failed to build context:', error);
      return { messageCount: 0, conversationAge: 0 };
    }
  }

  /**
   * Extract topics from conversation history
   */
  private async extractTopics(conversationId: string): Promise<string[]> {
    try {
      const messages = await prisma.chatMessage.findMany({
        where: { conversationId },
        select: { content: true, message: true },
        take: 20
      });

      const keywords = new Set<string>();
      const topicPatterns = [
        /(?:web|website|site|app|application|mobile)/i,
        /(?:design|ui|ux|interface|layout)/i,
        /(?:ai|machine learning|automation|chatbot)/i,
        /(?:seo|marketing|branding|logo)/i,
        /(?:budget|pricing|cost|quote)/i,
        /(?:timeline|deadline|schedule|when)/i,
        /(?:react|vue|angular|node|python)/i
      ];

      messages.forEach(msg => {
        const text = msg.content || msg.message || '';
        topicPatterns.forEach((pattern, idx) => {
          if (pattern.test(text)) {
            const topics = ['web/site development', 'design/UI/UX', 'AI/automation', 'marketing/branding', 'pricing/budget', 'timeline', 'tech stack'];
            keywords.add(topics[idx]);
          }
        });
      });

      return Array.from(keywords).slice(0, 5);
    } catch (error) {
      return [];
    }
  }

  /**
   * Get conversation history for context
   */
  private async getConversationHistory(
    conversationId: string,
    limit: number = 10
  ): Promise<Array<{ role: string; content: string }>> {
    try {
      const messages = await prisma.chatMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
        take: limit,
        select: { senderId: true, senderRole: true, content: true, message: true }
      });

      return messages.map(msg => ({
        role: msg.senderRole === 'ADMIN' || msg.senderRole === 'USER' ? (msg.senderRole === 'ADMIN' ? 'assistant' : 'user') : 'user',
        content: msg.content || msg.message || ''
      }));
    } catch (error) {
      logger.error('Failed to get conversation history:', error);
      return [];
    }
  }

  /**
   * Generate intelligent follow-up suggestions
   */
  async generateFollowUpSuggestions(
    lastUserMessage: string,
    conversationId: string
  ): Promise<string[]> {
    try {
      if (!this.model) return [];

      const prompt = `Based on this user message about web development services, suggest 2-3 short follow-up questions that would help clarify their needs:

"${lastUserMessage}"

Format as a JSON array of 2-3 strings, e.g.: ["What's your budget?", "Do you need mobile support?"]
Only return the JSON array, nothing else.`;

      const result = await this.model.generateContent(prompt);
      const text = result.response.text();

      try {
        return JSON.parse(text);
      } catch {
        return [];
      }
    } catch (error) {
      logger.error('Failed to generate follow-up suggestions:', error);
      return [];
    }
  }

  /**
   * Fallback response when AI fails
   */
  private getFallbackResponse(userMessage: string): AIResponse {
    const responses = [
      "Thank you for your message! I'm experiencing a temporary issue, but our team will get back to you within the next hour with a thoughtful response.",
      "I appreciate your inquiry about our services. Let me escalate this to our team for a detailed response. We typically reply within 1-2 hours.",
      "Your question is important to us. While I'm currently unavailable, our support team will contact you shortly with expert guidance."
    ];

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      confidence: 0.3,
      requiresHumanReview: true,
      metadata: { fallback: true }
    };
  }

  /**
   * Clear old cache entries
   */
  private clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of this.responseCache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.responseCache.delete(key);
      }
    }
  }

  /**
   * Initialize periodic cache cleanup
   */
  initializeCacheCleanup(): void {
    setInterval(() => this.clearExpiredCache(), this.CACHE_TTL);
  }
}

// Export singleton instance
export const advancedAIAgent = new AdvancedAIAgent();

// Initialize cache cleanup on startup
advancedAIAgent.initializeCacheCleanup();

/**
 * Legacy compatibility function
 */
export async function generateProjectSummary(brief: string): Promise<string> {
  const geminiKey = env.GEMINI_API_KEY;
  if (!geminiKey) {
    return `[AI Summary] The project appears to be a comprehensive digital solution. Recommended approach: Custom full-stack development with scalable architecture. Timeline: 4-8 weeks depending on complexity.`;
  }

  try {
    const ai = new GoogleGenerativeAI(geminiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = `You are a Principal Architect at Nexus Web Agency. Analyze this client brief: "${brief}"

Provide:
1. Concise technical summary (1 sentence)
2. Recommended technology stack (technologies only, no explanation)
3. Feasibility and timeline (1 sentence)

Format:
Summary: [your summary]
Stack: [technologies]
Timeline: [feasibility]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error: any) {
    logger.error('AI summary generation failed:', error.message);
    return `Unable to generate AI summary at this time. Our team will provide a detailed analysis via email within 24 hours.`;
  }
}
