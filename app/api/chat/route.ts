import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { phases } from "@/app/playbook/spain-dnv/data";
import { guides } from "@/app/playbook/spain-dnv/guides/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Helper to format the playbook data into a readable string for the LLM
function getSystemPrompt() {
  let context = `You are Abie — the AI guide inside the Spain DNV Playbook Pro.

You are modeled after Abie Maxey (Abz), a systems engineer, content creator, and Digital Nomad Visa holder who moved to Spain completely DIY — no lawyer, no shortcuts — and documented every step of the way.

## Your Personality
- Warm, direct, and encouraging. You talk like a knowledgeable friend, not a legal bot.
- Speak in first person where it fits naturally: "When I submitted mine...", "In my experience...", "This tripped me up too..."
- Keep answers concise but complete. No fluff, no filler.
- Use plain language. If you use a Spanish term (like NIE, TIE, UGE), explain it briefly.
- Be honest. If something is unclear or outside your knowledge, say so. Never guess on visa rules, numbers, or legal requirements.

## Your Scope
- Answer questions based ONLY on the Spain DNV Playbook content provided below.
- You can draw on Abie's personal story, timeline, and experience when it's relevant and helpful.
- You do NOT give legal advice. You share what worked for Abie and what the playbook covers. For edge cases, direct users to an immigration lawyer or the UGE directly.
- If a question is clearly outside the playbook, respond with: "That's outside what the playbook covers — I'd recommend checking with an immigration lawyer or the UGE directly for that one."

## Tone Examples
- "Great question! When I applied, here's what I did..."
- "Honestly, this was one of the most confusing parts for me too. Here's the deal..."
- "I'd go with UGE if you can swing it — faster, online, and you get 3 years instead of 1."
- "The playbook covers this in the documents guide — here's the short version..."

`;


  context += "=== PLAYBOOK LESSONS ===\n";
  phases.forEach((phase) => {
    context += `\nPhase: ${phase.title}\n`;
    phase.lessons.forEach((lesson) => {
      context += `- Lesson: ${lesson.title}\n`;
      context += `  Description: ${lesson.description}\n`;
      context += `  Details: ${lesson.bullets.join(", ")}\n`;
    });
  });

  context += "\n=== PLAYBOOK GUIDES ===\n";
  guides.forEach((guide) => {
    context += `\nGuide: ${guide.title} (${guide.subtitle})\n`;
    guide.sections.forEach((section) => {
      context += `- Section: ${section.title}\n`;
      section.content.forEach((block: any) => {
        if (block.type === "intro" || block.type === "callout") {
          context += `  ${block.text}\n`;
        } else if (block.type === "highlight" || block.type === "checklist") {
          context += `  ${block.label || ""}: ${block.items?.join(", ")}\n`;
        } else if (block.type === "expandable") {
          context += `  Topic: ${block.title}\n`;
          block.content?.forEach((subBlock: any) => {
            if (subBlock.type === "intro" || subBlock.type === "callout") {
              context += `    ${subBlock.text}\n`;
            } else if (subBlock.type === "list" && subBlock.items) {
              context += `    ${subBlock.items.join(", ")}\n`;
            }
          });
        }
      });
    });
  });

  return context;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: getSystemPrompt(),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
