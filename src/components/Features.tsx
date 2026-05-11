import { FileText, Mail, Megaphone, Scale, ClipboardList } from "lucide-react";
import { CONTENT_TYPES } from "@/lib/prompts";

const ICONS = {
  blog: FileText,
  complaint: Mail,
  social: Megaphone,
  explainer: Scale,
  incident: ClipboardList,
} as const;

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">What We Generate</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Five Powerful Content Generators</h2>
          <p className="mt-4 text-muted-foreground">
            Each tool uses role-based prompt engineering and South African legal context to produce
            accurate, human-sounding content.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTENT_TYPES.map((c) => {
            const Icon = ICONS[c.id];
            return (
              <div
                key={c.id}
                className="group relative glass rounded-xl p-6 hover:border-gold/50 transition"
              >
                <div className="w-11 h-11 rounded-lg bg-gold-soft border border-gold/40 grid place-items-center text-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl">{c.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
