import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { buildPrompt, type ContentType } from "@/lib/prompts";

type Body = {
  type: ContentType;
  topic: string;
  tone: string;
  language: string;
};

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { type, topic, tone, language } = (await request.json()) as Body;
          if (!type || !topic?.trim()) {
            return new Response(JSON.stringify({ error: "Missing type or topic" }), { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500 });

          const gateway = createLovableAiGatewayProvider(key);
          const model = gateway("google/gemini-3-flash-preview");
          const prompt = buildPrompt(type, topic, tone || "Educational", language || "English");

          const { text } = await generateText({ model, prompt });
          return Response.json({ content: text });
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : "Generation failed";
          console.error("[generate]", msg);
          return new Response(JSON.stringify({ error: msg }), { status: 500 });
        }
      },
    },
  },
});
