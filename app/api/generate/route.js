import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { reviewText, businessType, tone, goal, platform } = await req.json();

    if (!reviewText) {
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key is missing in server configuration.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are "ReviewPulse AI", an elite reputation management AI agent operating globally for a ${businessType || 'business'} on ${platform || 'Google Business Profile'}.
      
      Customer Review: "${reviewText}"
      Desired Tone: ${tone || 'Professional & Polite'}
      Strategic Goal: ${goal || 'Standard Reply'}

      Instructions:
      1. Analyze the review's language and reply in the EXACT SAME LANGUAGE as the review (e.g. French for French, Spanish for Spanish, English for English, Gujarati for Gujarati, etc.).
      2. If the review is positive and Strategic Goal is "Upsell & Promo", warmly thank them and offer an exclusive return incentive or discount code (e.g., WELCOME10).
      3. If the review is negative, apologize sincerely, address the core concern, and if Strategic Goal is "Private Resolution", provide a placeholder email (e.g., support@yourbusiness.com) to resolve offline.
      4. First, determine the sentiment in 1-3 words (e.g., "Positive/Delighted", "Negative/Frustrated", "Neutral").
      5. Keep the response concise, professional, empathetic, and human-like (2 to 4 sentences).

      Format output EXACTLY as JSON:
      {
        "sentiment": "Detected Sentiment Here",
        "reply": "Your full response here"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text);

    return NextResponse.json({
      sentiment: parsedData.sentiment,
      reply: parsedData.reply,
    });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process AI response' },
      { status: 500 }
    );
  }
}