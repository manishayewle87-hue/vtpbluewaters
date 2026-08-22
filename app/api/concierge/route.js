import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import knowledgeBase from '@/app/data/knowledge-base.json';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Construct the strict system prompt using our Knowledge Base
    const systemPrompt = `
      You are the official ${knowledgeBase.system_identity.role} for ${knowledgeBase.system_identity.company}.
      Your Tone: ${knowledgeBase.system_identity.tone}.
      Your Primary Directive: ${knowledgeBase.system_identity.primary_directive}

      CRITICAL RULES:
      1. NEVER mention competitors, other builders, or real estate portals like MagicBricks or 99acres.
      2. If asked about "MLA", always explain it as: "${knowledgeBase.core_philosophy.MLA}"
      3. For exact pricing negotiations, invite the user to call ${knowledgeBase.contact_info.phone} or email ${knowledgeBase.contact_info.email}.

      KNOWLEDGE BASE:
      Township: ${knowledgeBase.flagship_township.name} located in ${knowledgeBase.flagship_township.location}. Size: ${knowledgeBase.flagship_township.size}.
      Features: ${knowledgeBase.flagship_township.key_features.join(', ')}.

      Projects Available:
      ${knowledgeBase.projects.map(p => `- ${p.name} in ${p.location}. Configurations: ${p.configurations.join(', ')}. Price: ${p.starting_price}. USP: ${p.usp}`).join('\n')}
    `;

    const result = await streamText({
      model: google('gemini-1.5-pro'),
      system: systemPrompt,
      messages,
      temperature: 0.3, // Keep it factual and professional
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Concierge API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
