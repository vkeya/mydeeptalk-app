import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const crisisWords = [
  "suicide",
  "kill myself",
  "self harm",
  "self-harm",
  "hopeless",
  "abuse",
  "unsafe",
  "violence",
];

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return Response.json(
        { error: "Journal content is required." },
        { status: 400 }
      );
    }

    const lowerContent = content.toLowerCase();

    const hasCrisisWord = crisisWords.some((word) =>
      lowerContent.includes(word)
    );

    if (hasCrisisWord) {
      return Response.json({
        crisis: true,
        message:
          "I'm sorry you're going through this. You deserve support and do not have to face this alone. If you may be in immediate danger, please contact local emergency services or reach out to someone you trust.",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are DeepTalk AI.

You are not a therapist.
Do not diagnose, treat, or replace therapy.
Help users reflect gently and safely.

Return exactly:

## What I'm Hearing

## Possible Pattern

## Gentle Reflection Questions
- Question 1
- Question 2
- Question 3

## One Small Step

## Support Note
`,
        },
        {
          role: "user",
          content: `Journal Entry:\n\n${content}`,
        },
      ],
      temperature: 0.7,
    });

    return Response.json({
      crisis: false,
      reflection: completion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("DeepTalk AI error:", error);

    return Response.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}