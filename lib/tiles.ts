// Featured "surfaces" + supporting work as a system index.
// Each tile carries `accent`: the dominant color of the work itself, so a
// card feels like its own branded world. Drop a demo into /public/work/<id>.mp4
// (or .png) to replace the motif.

export type Tile = {
  id: string;
  title: string;
  tagline?: string; // ultra-punchy one-liner for the card/row glance view
  hook: string; // the fuller, tension-first line shown in the reveal
  tags: string[];
  year: string;
  org?: string;
  featured?: boolean;
  status: "live" | "shipped" | "research" | "building" | "submitted" | "concept";
  accent?: string; // dominant color of the design; falls back to status color
  image?: string;
  video?: string;
  impact?: string; // the result / outcome, one line
  impactLabel?: string; // defaults to "Result"; use "The goal" etc. for concepts
  confidential?: boolean;
  comingSoon?: boolean; // full case study still in progress (shows a pill)
  detail?: {
    problem: string;
    did: string[];
    decision: string;
    tools: string;
  };
};

export const tiles: Tile[] = [
  {
    id: "bumble",
    image: "/work/bumble.png",
    title: "Bumble",
    tagline: "A mutual friend makes the first move easier.",
    hook: "Making a friend online means trusting a stranger. Surfacing the mutual friends you already share turns a cold profile into a warm intro.",
    tags: ["Interaction Design", "Trust & Safety"],
    year: "2025",
    featured: true,
    status: "concept",
    accent: "#F4C430",
    impact: "A lightweight feature on existing infrastructure, designed to lift conversion, sharing, and adoption.",
    comingSoon: true,
  },
  {
    id: "spotify",
    image: "/work/spotify.png",
    title: "Spotify DJ",
    tagline: "Take the aux from the algorithm.",
    hook: "Your music algorithm is a black box you can't argue with. This DJ opens it up and hands you the dial.",
    tags: ["Interaction Design", "AI Transparency"],
    year: "2025—2026",
    featured: true,
    status: "concept",
    accent: "#1DB954",
    impact: "80% higher satisfaction than the standard DJ in user testing.",
    comingSoon: true,
  },
  {
    id: "analogical-engines",
    image: "/work/analogical-engines.png",
    title: "Analogical Engines",
    tagline: "Innovation by analogy, not by accident.",
    hook: "History's biggest breakthroughs were analogies borrowed from another field. This AI finds the ones your experts, and off-the-shelf models, would never reach.",
    tags: ["AI Product", "Agentic Workflows"],
    year: "2025—present",
    status: "shipped",
    accent: "#8B7CF6",
    impact: "Won CMU's McGinnis ($150k), now in active pilots.",
    confidential: true,
    comingSoon: true,
  },
  {
    id: "cozu",
    image: "/work/cozu.png",
    title: "Cozu",
    tagline: "The knowledge that walks out the door when experts do.",
    hook: "Experts won't document what they know when they fear it'll train their replacement. Cozu makes sharing feel safe, and worth it.",
    tags: ["AI Product", "Adoption & Trust"],
    year: "2026",
    status: "shipped",
    accent: "#17B8A8",
    impact: "Signed letters of intent to adopt, with Fortune 500 pilot conversations underway.",
    comingSoon: true,
  },
  {
    id: "zelig",
    image: "/work/zelig.png",
    title: "Zelig",
    tagline: "Style the runway from your couch.",
    hook: "You can't try clothes on through a screen, so you guess, then send half of it back. Zelig replaces the guesswork with virtual try-on and styling.",
    tags: ["GenAI", "Product Design"],
    year: "2023",
    status: "shipped",
    accent: "#E85C8A",
    impact: "Launched on Revolve; supported a $15M Series A.",
    confidential: true,
    comingSoon: true,
  },
];
