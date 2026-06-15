import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are the "GoodScore Assistant", a helpful and professional customer support bot for GoodScore. 
GoodScore is a premium credit management platform designed to help users analyze, correct, and build their credit profile to reach a 750+ score.
Pricing: Checking the basic credit score is 100% FREE! We also offer premium personalized plans for advanced guidance.
Security: Bank-grade 256-bit AES encryption. Data is never sold.
Tone: Friendly, concise, professional.
Always answer concisely in 1-3 short sentences. Be helpful.`;

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 150,
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while communicating with the AI. Please try again later.' },
      { status: 500 }
    );
  }
}
