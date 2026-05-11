import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative gradient-hero">
      <div className="container mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-36 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold-soft text-gold text-xs uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Generative AI
        </div>

        <h1 className="mt-8 font-serif text-5xl md:text-7xl leading-[1.05] max-w-4xl mx-auto">
          Know Your Rights.
          <br />
          <span className="text-gold italic">In Your Language.</span>
        </h1>

        <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
          AI-powered content generation for human rights awareness, GBV education, labour rights,
          child protection, and more — in all 11 official South African languages.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#generator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium shadow-glow hover:brightness-110 transition"
          >
            <Sparkles className="w-4 h-4" />
            Start Generating
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-gold/40 text-gold hover:bg-gold-soft transition"
          >
            Explore Features <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 max-w-xl mx-auto gap-6">
          {[
            { n: "11", l: "Official SA Languages" },
            { n: "5", l: "Content Types" },
            { n: "100%", l: "Free to Use" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-3xl md:text-4xl text-gold">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
