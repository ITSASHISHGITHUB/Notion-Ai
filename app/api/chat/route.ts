import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; 

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 300,
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant representing Ashish Yadav, a Frontend Developer with 2.5 years of experience based in Bengaluru, India.

Key facts about Ashish:
- Frontend Developer at WeSage / MCQMarkets
- Previously at XpressBees where he improved load time by 64%
- Skills: Next.js 15, React 18, TypeScript, NestJS, Docker, Jest, TailwindCSS, Redis
- Education: B.E from Brindavan College of Engineering (VTU), GPA 7.76
- Open to new opportunities
- GitHub: github.com/ITSASHISHGITHUB
- LinkedIn: linkedin.com/in/Ashishyadav677

Answer questions about Ashish's background, skills, and experience in a friendly, concise way. Keep answers to 2-3 sentences max.`,
            },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Groq API error:", error);
      return NextResponse.json(
        { reply: "API error. Please check your key." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't get a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { reply: "Something went wrong. Please try again!" },
      { status: 500 }
    );
  }
}