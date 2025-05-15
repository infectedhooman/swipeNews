// src/services/llmService.ts

interface SummaryRequest {
  articleContent: string;
  summaryType: 'bullets' | 'short' | 'weekly';
}

interface QuestionRequest {
  question: string;
  context: string;
}

export interface Summary {
  type: 'bullets' | 'short' | 'weekly';
  content: string[] | string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  sources?: { title: string; url: string }[];
}

export interface ArticleAnalysis {
  tags: string[];
  keywords: string[];
  factCheck?: { claim: string; verified: boolean; source?: string }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// === Gemini Pro Endpoint ===
const GEMINI_API_KEY = 'AIzaSyDcxxWBLdpDGBCJgbZvMuTRCbB0VW_MlIg'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

// ========== Gemini API Fetch Helper ==========
async function geminiFetch(body: any) {
  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${text}`);
  }
  return res.json();
}

// ========== LLM Service ==========

export async function generateSummary({
  articleContent,
  summaryType,
}: SummaryRequest): Promise<Summary> {
  let promptText: string;
  if (summaryType === 'bullets') {
    promptText = `Summarize the following article into 5 concise bullet points:\n\n${articleContent}`;
  } else if (summaryType === 'short') {
    promptText = `Write a 2-sentence summary of the following article:\n\n${articleContent}`;
  } else {
    promptText = `Write a 1-2 sentence weekly digest of the following article:\n\n${articleContent}`;
  }

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }]
      }
    ]
  };

  const data = await geminiFetch(payload);
  const output = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  if (!output) throw new Error('No summary returned from Gemini');

  if (summaryType === 'bullets') {
    const lines = output
      .split(/\r?\n/)
      .map(l => l.replace(/^[-•*]\s*/, '').trim())
      .filter(l => l.length > 0)
      .slice(0, 5);
    return { type: 'bullets', content: lines };
  } else {
    return { type: summaryType, content: output };
  }
}

export async function askQuestion({
  question,
  context,
}: QuestionRequest): Promise<QuestionAnswer> {
  const promptText = `Context:\n${context}\n\nQuestion: ${question}\nAnswer:`;

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }]
      }
    ]
  };

  const data = await geminiFetch(payload);
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No answer could be generated.';
  return { question, answer };
}

export async function analyzeArticle(article: { title: string; content: string }): Promise<ArticleAnalysis> {
  const prompt = `
Given the following news article, extract up to 3 factual claims that a reader might want to fact-check. For each claim:
- Provide the claim as a string.
- State if the article itself provides evidence for the claim (true), disproves it (false), or is unverifiable from the article (null).
- If any source is cited in the article for the claim, mention it, otherwise "No source cited".

Return ONLY a JSON array, e.g.
[
  {
    "claim": "...",
    "verified": true,
    "source": "..."
  }
]

ARTICLE TITLE: ${article.title}
ARTICLE CONTENT: ${article.content?.slice(0, 4000) || ''}
  `.trim();

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const data = await geminiFetch(payload);
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    // Try to extract JSON array from Gemini output
    let factCheck: ArticleAnalysis['factCheck'] = [];
    const jsonMatch = rawText.match(/\[\s*{[\s\S]+?}\s*\]/);
    if (jsonMatch) {
      factCheck = JSON.parse(jsonMatch[0]);
    } else {
      factCheck = [{
        claim: 'Could not parse verification claims',
        verified: null,
        source: ''
      }];
    }

    // Optionally, you could also add tags/keywords extraction in a similar way.

    return {
      tags: [], // add real tags if you want to prompt for them
      keywords: [],
      factCheck,
    };
  } catch (error) {
    console.error('Error in analyzeArticle:', error);
    return {
      tags: [],
      keywords: [],
      factCheck: [{
        claim: 'Error verifying article',
        verified: null,
        source: ''
      }]
    };
  }
}
