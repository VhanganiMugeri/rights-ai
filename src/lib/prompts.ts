export type ContentType = "blog" | "complaint" | "social" | "explainer" | "incident";

export const CONTENT_TYPES: { id: ContentType; label: string; description: string }[] = [
  { id: "blog", label: "Blog Post", description: "Educational awareness articles on GBV, labour rights, tenant law, child protection and more." },
  { id: "complaint", label: "Complaint Email", description: "Professional formal complaint letters for workplace, school, landlord, and harassment situations." },
  { id: "social", label: "Social Media", description: "Awareness campaign content for Instagram, Facebook, and LinkedIn with hashtags included." },
  { id: "explainer", label: "Rights Explainer", description: "Complex legal rights explained in plain, accessible language with practical action steps." },
  { id: "incident", label: "Incident Report", description: "Structured formal reporting templates for workplace, school, and public safety incidents." },
];

export const TONES = ["Educational", "Formal", "Empathetic", "Urgent", "Simple & Clear"] as const;

export const LANGUAGES = [
  "English", "isiZulu", "isiXhosa", "Afrikaans", "Sesotho",
  "Sepedi", "Setswana", "Tshivenda", "Xitsonga", "siSwati", "isiNdebele",
] as const;

export const IMAGE_CATEGORIES = [
  "Human Rights", "GBV Awareness", "Child Protection", "Anti-Bullying",
  "Workplace Safety", "Mental Health", "Community Safety", "Educational Impact",
] as const;

export const EXAMPLE_IMAGE_PROMPTS = [
  "A poster showing unity against gender-based violence — diverse South African women standing together, symbolic, hopeful, professional campaign style",
  "Anti-bullying campaign poster for schools with children of different backgrounds supporting each other, warm and protective atmosphere",
  "Workplace safety awareness showing diverse workers in a modern South African workplace, safety equipment, dignity and inclusion",
  "Mental health awareness poster showing a person finding support and hope, soft warm colours, accessible and compassionate",
  "Child protection poster showing a safe school environment with caring teachers and protected children, bright and reassuring",
  "Human rights poster showing diverse South Africans celebrating constitutional rights, vibrant flag colours, unity in diversity",
];

export function buildPrompt(type: ContentType, topic: string, tone: string, language: string): string {
  const langLine = `Write the final output in ${language}. If ${language} is not English, you may keep legal terms in English in parentheses where helpful.`;
  const ctx = `South African legal and social context. Reference the South African Constitution, Bill of Rights, Labour Relations Act, Domestic Violence Act, Children's Act, and POPIA where relevant. Always include a short disclaimer that this is educational and not a substitute for legal advice or emergency services.`;

  const role: Record<ContentType, string> = {
    blog: `You are a senior human-rights educator and journalist writing for a South African public audience. Produce a well-structured blog post (~600-900 words) with: a strong headline, an introduction, 3-5 H2 subheadings, practical examples, a "What you can do" action list, and a closing call-to-action. Tone: ${tone}.`,
    complaint: `You are a paralegal drafting a formal complaint letter on behalf of an ordinary South African. Output a complete, ready-to-send letter with: date placeholder, recipient block, subject line, factual chronological account, the specific rights/policies violated, the remedy requested, a deadline, and signature block. Tone: ${tone}.`,
    social: `You are a campaign content strategist. Produce 3 social posts: (1) Instagram caption with line breaks and emojis, (2) Facebook post (longer, narrative), (3) LinkedIn post (professional, advocacy-focused). End each with 5-10 relevant hashtags. Tone: ${tone}.`,
    explainer: `You are a plain-language legal educator. Explain the rights involved in clear, simple terms. Structure: "What this means", "Your rights", "What the law says (short reference)", "Steps you can take", "Where to get help (SA hotlines: SAPS 10111, GBV Command Centre 0800 428 428, Childline 116, CCMA 0861 161 616)". Tone: ${tone}.`,
    incident: `You are a compliance officer producing a structured incident report template, fully filled in based on the user's situation. Sections: Reporter details, Date/Time/Location, Parties involved, Detailed description of the incident, Witnesses, Evidence, Immediate actions taken, Recommended follow-up, Reference to applicable policy/law. Tone: ${tone}.`,
  };

  return `${role[type]}\n\nContext: ${ctx}\n\n${langLine}\n\nTopic / situation from user:\n"""${topic}"""\n\nReturn only the finished content in Markdown — no preamble, no meta commentary.`;
}

export const PROMPT_LIBRARY: { type: ContentType; label: string; template: string }[] = [
  { type: "blog", label: "Blog Post", template: buildPrompt("blog", "{TOPIC}", "{TONE}", "{LANGUAGE}") },
  { type: "complaint", label: "Complaint Email", template: buildPrompt("complaint", "{TOPIC}", "{TONE}", "{LANGUAGE}") },
  { type: "social", label: "Social Media", template: buildPrompt("social", "{TOPIC}", "{TONE}", "{LANGUAGE}") },
  { type: "explainer", label: "Rights Explainer", template: buildPrompt("explainer", "{TOPIC}", "{TONE}", "{LANGUAGE}") },
  { type: "incident", label: "Incident Report", template: buildPrompt("incident", "{TOPIC}", "{TONE}", "{LANGUAGE}") },
];
