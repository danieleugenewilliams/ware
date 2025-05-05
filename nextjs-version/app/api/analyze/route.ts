import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const llmPromptPath = path.join(process.cwd(), '..', 'documentation', 'llm-system-prompt.md');
const rawPrompt = fs.readFileSync(llmPromptPath, 'utf8');
// Enforce raw JSON only, no markdown or code fences
const systemPrompt = `IMPORTANT: Return ONLY the raw JSON object, with no markdown code blocks or formatting.\n\n${rawPrompt}`;

interface LLMRequestOptions {
  modelId?: string;
  maxTokens?: number;
  apiUrl?: string;
}

export async function POST(request: Request) {
  const { jobDescription } = await request.json();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1234/v1/chat/completions';
  const modelId = process.env.NEXT_PUBLIC_MODEL_ID || 'gemma-3-4B-it-qat-GGUF';
  const maxTokens = Number(process.env.NEXT_PUBLIC_MAX_TOKENS) || 1500;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze the following job description: ${jobDescription}` }
        ],
        max_tokens: maxTokens
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `LLM API error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    const raw = data.choices[0].message.content;
    // extract JSON
    const match = raw.replace(/```json/g, '').replace(/```/g, '').trim().match(/({[\s\S]*})/);
    if (!match) {
      throw new Error('No valid JSON found in LLM response');
    }
    const result = JSON.parse(match[1]);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}