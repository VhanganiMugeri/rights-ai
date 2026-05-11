import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10 text-sm text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold" />
          <span className="font-serif">RightsWise <span className="text-gold italic">AI</span></span>
        </div>
        <p className="text-xs text-center md:text-right max-w-xl">
          Educational tool. Not legal advice. In an emergency call SAPS 10111 · GBV Command Centre 0800 428 428 · Childline 116.
        </p>
      </div>
    </footer>
  );
}
