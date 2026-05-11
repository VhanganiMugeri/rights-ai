import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Generator } from "@/components/Generator";
import { PromptLibrary } from "@/components/PromptLibrary";
import { ImageGenerator } from "@/components/ImageGenerator";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RightsWise AI — Know Your Rights, In Your Language" },
      {
        name: "description",
        content:
          "AI-powered content generation for human rights, GBV, labour, and child protection awareness in all 11 official South African languages.",
      },
      { property: "og:title", content: "RightsWise AI — Know Your Rights" },
      { property: "og:description", content: "Generate rights-aware blog posts, complaint letters, social posts, explainers and incident reports." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Generator />
        <PromptLibrary />
        <ImageGenerator />
      </main>
      <Footer />
    </div>
  );
}
