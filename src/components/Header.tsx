import { Shield } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#generator", label: "Generator" },
  { href: "#prompts", label: "Prompts" },
  { href: "#images", label: "Images" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="grid place-items-center w-9 h-9 rounded-lg bg-gold-soft border border-gold/40 text-gold transition-transform group-hover:scale-105">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-serif text-xl tracking-tight">
            RightsWise <span className="text-gold italic">AI</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
