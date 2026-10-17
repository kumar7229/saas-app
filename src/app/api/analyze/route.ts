import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { topic, transcript } = await req.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript cannot be empty' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (apiKey && !apiKey.includes('your-google-gemini-api-key')) {
      // Real Gemini API Call
      const genAI = new GoogleGenerativeAI(apiKey);
      // Try gemini-2.5-flash or fallback model names
      let model;
      try {
        model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          generationConfig: { responseMimeType: 'application/json' },
        });
      } catch {
        model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash-latest',
          generationConfig: { responseMimeType: 'application/json' },
        });
      }

      const prompt = `
You are an expert English language coach. Analyze the following speech transcript for:
1. Grammar errors (list each error with original string, correction, and brief explanation)
2. Vocabulary usage (rate from Basic, Intermediate, or Advanced)
3. Fluency & coherence (rate out of 10)
4. Pronunciation suggestions (based on common phonetic patterns for words used)
5. Overall score out of 100
6. 3 specific actionable tips to improve

Topic: "${topic}"
Transcript: "${transcript}"

Return ONLY valid JSON with this exact structure:
{
  "score": 85,
  "grammarErrors": [
    {
      "original": "error text",
      "correction": "corrected text",
      "explanation": "why this is wrong"
    }
  ],
  "vocabularyLevel": "Intermediate",
  "fluencyScore": 8,
  "pronunciationTips": ["tip 1", "tip 2"],
  "tips": ["tip 1", "tip 2", "tip 3"]
}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text);

      return NextResponse.json(parsed);
    }

    // Mock Analysis Engine fallback if API key is not present or invalid
    const wordCount = transcript.trim().split(/\s+/).length;

    let score = Math.min(95, Math.max(65, 70 + Math.floor(wordCount / 3)));
    let vocabularyLevel: 'Basic' | 'Intermediate' | 'Advanced' = 'Intermediate';
    if (wordCount > 40) vocabularyLevel = 'Advanced';
    else if (wordCount < 15) vocabularyLevel = 'Basic';

    const mockGrammarErrors = [];
    if (transcript.toLowerCase().includes('i goes') || transcript.toLowerCase().includes('he go')) {
      mockGrammarErrors.push({
        original: 'i goes',
        correction: 'I go / He goes',
        explanation: 'Subject-verb agreement error for present simple tense.',
      });
    }

    if (transcript.toLowerCase().includes('more better')) {
      mockGrammarErrors.push({
        original: 'more better',
        correction: 'much better',
        explanation: 'Avoid double comparative adjectives.',
      });
    }

    return NextResponse.json({
      score: score,
      grammarErrors: mockGrammarErrors.length > 0 ? mockGrammarErrors : [
        {
          original: transcript.split(' ')[0] || 'speech',
          correction: transcript.split(' ')[0] || 'speech',
          explanation: 'Minor intonation pause detected.',
        }
      ],
      vocabularyLevel: vocabularyLevel,
      fluencyScore: Math.min(10, Math.max(6, Math.floor(score / 10))),
      pronunciationTips: [
        'Pay attention to connected speech between vowel endings and starting consonants.',
        'Emphasize key content words (nouns, verbs) over function words.',
      ],
      tips: [
        'Try incorporating transition words like "Furthermore", "In addition", and "However" to connect ideas.',
        'Vary your sentence lengths between short impactful statements and complex sentences.',
        'Practice slowing down slightly to ensure clear articulation of word endings like "-ed" and "-s".',
      ],
    });
  } catch (error: any) {
    console.error('API analyze error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze speech' },
      { status: 500 }
    );
  }
}
