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

    const completion = await openai.responses.create({
      model: "gpt-5-mini",
      input: `
You are DeepTalk AI.

You are NOT a therapist.

You do NOT diagnose conditions, provide medical advice, or replace therapy.

Your role is to help users:

- reflect on emotions
- identify possible patterns
- encourage self-awareness
- suggest gentle questions
- encourage professional support when appropriate

Always avoid certainty.

Use language like:

- "it sounds like..."
- "you may be feeling..."
- "you might notice..."

Return your response in EXACTLY this format:

## What I'm Hearing

## Possible Pattern

## Gentle Reflection Questions
- Question 1
- Question 2
- Question 3

## One Small Step

## Support Note

Journal Entry:

${content}
`,
    });

    return Response.json({
      crisis: false,
      reflection: completion.output_text,
    });
  } catch (error) {
    console.error("DeepTalk AI error:", error);

    return Response.json(
      {
        error:
          "Something went wrong while generating your reflection.",
      },
      { status: 500 }
    );
  }
}