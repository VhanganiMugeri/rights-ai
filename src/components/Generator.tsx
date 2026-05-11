import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, AlertTriangle } from "lucide-react";
import { CONTENT_TYPES, TONES, LANGUAGES, type ContentType } from "@/lib/prompts";

export function Generator() {
  const [type, setType] = useState<ContentType>("blog");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<string>(TONES[0]);
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!topic.trim()) {
      setError("Please describe a topic or situation.");
      return;
    }
    setError("");
    setOutput("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, topic, tone, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setOutput(data.content);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section id="generator" className="py-24 border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">AI Content Generator</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Generate Rights-Aware Content</h2>
          <p className="mt-4 text-muted-foreground">
            Select a content type, describe your topic, choose your tone and language.
          </p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto glass rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gold-soft border border-gold/30 text-sm">
            <AlertTriangle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              <span className="text-gold font-medium">Disclaimer:</span> This AI provides educational
              and informational support only. It is not a substitute for legal professionals,
              psychologists, emergency services, or law enforcement.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CONTENT_TYPES.map((c) => (
              <button
                key={c.id}
                onClick={() => setType(c.id)}
                className={`px-4 py-2 rounded-lg text-sm border transition ${
                  type === c.id
                    ? "bg-gold text-accent-foreground border-gold"
                    : "border-border hover:border-gold/50 text-muted-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <label className="block mt-6 text-xs uppercase tracking-wider text-muted-foreground">
            Topic / Situation *
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={4}
            placeholder="Describe what you need... e.g. A blog post about a worker's right to refuse unsafe work in South Africa."
            className="mt-2 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />

          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-md text-xs border transition ${
                      tone === t ? "bg-primary border-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-gold/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium shadow-glow hover:brightness-110 disabled:opacity-60 transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Generating..." : `Generate ${CONTENT_TYPES.find((c) => c.id === type)?.label}`}
          </button>

          {error && (
            <p className="mt-4 text-sm text-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </p>
          )}

          {output && (
            <div className="mt-7 rounded-xl border border-border bg-background/40">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                <span className="text-xs uppercase tracking-wider text-gold">Generated Output</span>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="px-5 py-5 text-sm whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed max-h-[600px] overflow-auto">
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
