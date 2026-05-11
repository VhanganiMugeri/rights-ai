import { useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import { PROMPT_LIBRARY } from "@/lib/prompts";

export function PromptLibrary() {
  const [open, setOpen] = useState<string | null>(PROMPT_LIBRARY[0].label);
  return (
    <section id="prompts" className="py-24 border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Prompt Engineering</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Prompt Library</h2>
          <p className="mt-4 text-muted-foreground">
            The reusable prompt templates powering each generator. Explore how prompt engineering shapes AI output.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {PROMPT_LIBRARY.map((p) => {
            const isOpen = open === p.label;
            return (
              <div key={p.label} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : p.label)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gold-soft/40 transition"
                >
                  <div className="flex items-center gap-3 text-left">
                    <Code2 className="w-4 h-4 text-gold" />
                    <div>
                      <div className="font-serif text-lg">{p.label}</div>
                      <div className="text-xs text-muted-foreground">Role + context + structure prompt</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <pre className="px-5 pb-5 pt-1 text-xs whitespace-pre-wrap text-muted-foreground font-mono leading-relaxed border-t border-border/60">
                    {p.template}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
