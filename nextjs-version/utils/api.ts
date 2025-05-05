/**
 * Utility for handling LLM API requests
 */

// Load LLM system prompt only on server-side
const llmSystemPrompt = typeof window === 'undefined'
  ? require('fs').readFileSync(
      require('path').join(process.cwd(), '..', 'documentation', 'llm-system-prompt.md'),
      'utf8'
    )
  : '';

export interface LLMRequestOptions {
  modelId?: string;
  maxTokens?: number;
  apiUrl?: string;
}

// Define interfaces for structured LLM response
export interface AnalysisTask {
  task: string;
  category: string;
  weight: number;
  category_explanation: string;
  weight_explanation: string;
  automation_outlook: string;
}

export interface AnalysisResult {
  preliminary_score: number;
  final_score: number;
  summary: string;
  tasks: AnalysisTask[];
  recommendations: string[];
}

export async function analyzeLLM(jobDescription: string, options?: LLMRequestOptions): Promise<AnalysisResult> {
  // Call our Next.js proxy route
  const apiUrl = options?.apiUrl || '/api/analyze';
  const modelId = options?.modelId || process.env.NEXT_PUBLIC_MODEL_ID || 'gemma-3-4B-it-qat-GGUF';
  const maxTokens = options?.maxTokens || Number(process.env.NEXT_PUBLIC_MAX_TOKENS) || 1500;

  console.log(`Proxying analysis via: ${apiUrl}`);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Parse the AnalysisResult JSON directly from our proxy route
    const result = (await response.json()) as AnalysisResult;
    if (typeof result.preliminary_score !== 'number' || result.preliminary_score < 0 || result.preliminary_score > 100) {
      throw new Error('Invalid preliminary_score');
    }
    if (typeof result.final_score !== 'number' || result.final_score < 0 || result.final_score > 100) {
      throw new Error('Invalid final_score');
    }
    if (typeof result.summary !== 'string') {
      throw new Error('Invalid summary');
    }
    if (!Array.isArray(result.tasks)) {
      throw new Error('Invalid tasks array');
    }
    result.tasks.forEach((task, idx) => {
      const fields: Array<keyof AnalysisTask> = ['task','category','weight','category_explanation','weight_explanation','automation_outlook'];
      fields.forEach(field => {
        if (task[field] === undefined) {
          throw new Error(`Task ${idx} is missing field: ${field}`);
        }
      });
      if (typeof task.task !== 'string' || typeof task.category !== 'string') {
        throw new Error(`Task ${idx} has invalid string fields`);
      }
      if (typeof task.weight !== 'number' || task.weight < 1 || task.weight > 100) {
        throw new Error(`Task ${idx} has invalid weight`);
      }
    });
    if (!Array.isArray(result.recommendations) || !result.recommendations.every(r => typeof r === 'string')) {
      throw new Error('Invalid recommendations array');
    }
    return result;
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to analyze job description. Please try again.'
    );
  }
}