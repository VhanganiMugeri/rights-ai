import { useState } from "react";
import { Image as ImageIcon, Loader2, AlertTriangle, Download, Sparkles } from "lucide-react";
import { IMAGE_CATEGORIES, EXAMPLE_IMAGE_PROMPTS } from "@/lib/prompts";

export function ImageGenerator() {
  const [category, setCategory] = useState<string>(IMAGE_CATEGORIES[0]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function generate() {
    if (!prompt.trim()) { setError("Describe the image you want."); return; }
    setError(""); setImage(null); setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setImage(data.image);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Image generation failed");
    } finally { setLoading(false); }
  }

  return (
    <section id="images" className="py-24 border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">AI Image Generator</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Generate Awareness Images</h2>
          <p className="mt-4 text-muted-foreground">
            Create professional rights-awareness visuals — ready for campaigns, blogs, and social media.
          </p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto glass rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {IMAGE_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs border transition ${
                  category === c ? "bg-gold text-accent-foreground border-gold" : "border-border text-muted-foreground hover:border-gold/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="block mt-6 text-xs uppercase tracking-wider text-muted-foreground">
            Describe Your Image *
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="A poster showing unity against gender-based violence..."
            className="mt-2 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />

          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Example Prompts</p>
            <div className="grid md:grid-cols-2 gap-2">
              {EXAMPLE_IMAGE_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  className="text-left text-xs p-3 rounded-lg border border-border hover:border-gold/40 hover:bg-gold-soft/30 transition text-muted-foreground"
                >
                  {p.length > 90 ? p.slice(0, 90) + "…" : p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium shadow-glow hover:brightness-110 disabled:opacity-60 transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Creating image..." : "Generate Image"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </p>
          )}

          {image && (
            <div className="mt-7">
              <img src={image} alt={prompt} className="w-full rounded-xl border border-border" />
              <a
                href={image}
                download="rightswise-image.png"
                className="mt-3 inline-flex items-center gap-2 text-sm text-gold hover:underline"
              >
                <Download className="w-4 h-4" /> Download image
              </a>
            </div>
          )}

          {!image && !loading && (
            <div className="mt-7 grid place-items-center h-56 rounded-xl border border-dashed border-border text-muted-foreground">
              <div className="text-center">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Your generated image will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
