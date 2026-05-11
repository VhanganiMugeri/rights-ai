import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

type Body = { prompt: string; category?: string };

export const Route = createFileRoute("/api/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { prompt, category } = (await request.json()) as Body;
          if (!prompt?.trim()) {
            return new Response(JSON.stringify({ error: "Missing prompt" }), { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500 });

          const fullPrompt = `${category ? `[${category}] ` : ""}${prompt}. Professional rights-awareness poster style, South African context, dignified, inclusive, high quality.`;

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-image-preview",
              messages: [{ role: "user", content: fullPrompt }],
              modalities: ["image", "text"],
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            console.error("[generate-image] gateway error", res.status, errText);
            return new Response(JSON.stringify({ error: `Image gateway error: ${res.status}` }), { status: res.status });
          }
          const data = await res.json();
          const imageUrl: string | undefined =
            data?.choices?.[0]?.message?.images?.[0]?.image_url?.url ??
            data?.choices?.[0]?.message?.images?.[0]?.url;
          if (!imageUrl) {
            return new Response(JSON.stringify({ error: "No image returned" }), { status: 502 });
          }
          return Response.json({ image: imageUrl });
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : "Image generation failed";
          console.error("[generate-image]", msg);
          return new Response(JSON.stringify({ error: msg }), { status: 500 });
        }
      },
    },
  },
});
