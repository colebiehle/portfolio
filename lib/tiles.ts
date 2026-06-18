// 2 featured "surfaces" + supporting work as a system index.
// `status` drives the system status indicator. Drop a demo into
// /public/work/<id>.mp4 (or .png); otherwise the surface renders a wireframe.

export type Tile = {
  id: string;
  title: string;
  hook: string;
  tags: string[];
  year: string;
  org?: string;
  badge?: string;
  featured?: boolean;
  status: "live" | "shipped" | "research" | "building" | "submitted";
  image?: string;
  video?: string;
  impact?: string;
  note?: string;
  confidential?: boolean;
  detail: {
    problem: string;
    did: string[];
    decision: string;
    tools: string;
  };
};

// To show real work on a surface, set `image: "/work/<id>.png"` or
// `video: "/work/<id>.mp4"` on a tile below. Until then it renders the wireframe.
const media = (_id: string): { image?: string; video?: string } => ({});

export const tiles: Tile[] = [
  {
    id: "analogical-engines",
    title: "Analogical Engines",
    hook: "Breaks R&D teams out of cognitive fixation, surfacing the ideas they would never have reached alone.",
    tags: ["Human-AI", "Product Design", "Built in code"],
    year: "2025—present",
    badge: "McGinnis winner",
    featured: true,
    status: "building",
    impact: "Won the $150k grand prize at CMU's McGinnis Venture Competition.",
    note: "killed the chatbot early. the model was the boring part, so I shipped the canvas that made teams think differently.",
    ...media("analogical-engines"),
    detail: {
      problem:
        "R&D teams get stuck on the first plausible idea. The bottleneck isn't generating options, it's escaping the obvious ones (cognitive fixation), and conventional tools just reorganize what a team already thought of.",
      decision:
        "I killed the chatbot version early. A conversational assistant only reflected the team's existing framing back at them. The unlock was a canvas that forces analogies from distant domains, so the model became scaffolding instead of the product.",
      did: [
        "Ran the foundational qualitative research on R&D ideation bottlenecks in CMU's Kittur Lab.",
        "Designed and built a multi-agent pipeline that recruits stakeholders, runs interviews, and synthesizes findings into analogical prompts.",
        "Pitched it to a $150k grand-prize win at the McGinnis Venture Competition.",
      ],
      tools:
        "Multi-agent LLM orchestration, React, Figma. Researched, designed, and built end to end.",
    },
  },
  {
    id: "ui-for-ai",
    title: "UI for AI",
    hook: "What AI design looks like after the chat box: patterns for steering generative models.",
    tags: ["Interaction Design", "Human-AI", "Prototyping"],
    year: "2025—2026",
    featured: true,
    status: "research",
    impact: "Presented to industry design leaders.",
    note: "the chat box is a dead end. this is the design space after it.",
    ...media("ui-for-ai"),
    detail: {
      problem:
        "Chat is a dead end for most real AI work. It hides the model's uncertainty and gives people almost no control. The open question: what are the interaction primitives that come after the prompt box?",
      decision:
        "I stopped trying to make chat better and designed around direct manipulation, letting people steer outputs spatially and by reference instead of describing everything in prose.",
      did: [
        "Prototyped AI-native interaction patterns for directing, refining, and collaborating with generative models.",
        "Tested them against conversational baselines and presented the patterns to industry design leaders.",
      ],
      tools: "React prototypes, LLM APIs, Figma.",
    },
  },
  {
    id: "honda",
    title: "Honda 99P Labs",
    hook: "How drivers should signal each other on the road. Led the research, prototyped the answer in code.",
    tags: ["Product Design", "Prototyping"],
    year: "2026",
    org: "Honda",
    status: "building",
    impact: "Presented prototypes to the lead of Honda 99P Labs.",
    note: "100+ surveys said what the 50 interviews already had. designed for the interviews.",
    confidential: true,
    ...media("honda"),
    detail: {
      problem:
        "Drivers signal intent with a handful of crude tools (the horn, the lights, a wave) that misfire constantly. How might drivers communicate more clearly without taking attention off the road?",
      decision:
        "The 100+ surveys pointed toward flashy multimodal concepts, but the 50+ interviews were clear that drivers reject anything that adds cognitive load. I designed for the interviews and cut the concepts that competed with driving.",
      did: [
        "Led a team's mixed-methods research: 100+ surveys, 50+ interviews, and AI-assisted synthesis.",
        "Translated the findings into multimodal concepts, prototyped them in code, and presented to the lead of Honda 99P Labs.",
      ],
      tools: "Figma, AI-assisted synthesis, code prototypes.",
    },
  },
  {
    id: "zelig",
    title: "Zelig",
    hook: "A GenAI fashion startup where my research steered product strategy, from concept to a $15M raise.",
    tags: ["UX Research", "Product Design", "0→1"],
    year: "2023",
    badge: "Series A",
    status: "shipped",
    impact:
      "Research-led product strategy; the work supported a $15M Series A at a $100M valuation.",
    note: "i was the researcher, but the research drove what we built and how we pitched.",
    confidential: true,
    ...media("zelig"),
    detail: {
      problem:
        "A GenAI fashion tool with real model capability but no clear product-market fit or shape. What should it actually be, and for whom?",
      decision:
        "Rather than design every idea, I built a feature framework that scored concepts against user evidence. It cut prototyping time about 40% and kept the team building the right things.",
      did: [
        "Defined product-market fit through 50+ interviews, 200+ surveys, and an analysis of 30+ competitors.",
        "Designed the mobile and desktop experiences, producing the demo work that supported a $15M Series A.",
      ],
      tools: "Figma, user research, rapid prototyping.",
    },
  },
  {
    id: "ideation-cues",
    title: "Conversational cues for ideation",
    hook: "How the way an AI talks back can push a group toward broader, better ideas.",
    tags: ["Human-AI", "Research"],
    year: "2025",
    badge: "CI 2025",
    status: "research",
    impact:
      "Published at Collective Intelligence 2025, from a 172-participant study.",
    note: "the prompt isn't the product. the conversation around it is.",
    ...media("ideation-cues"),
    detail: {
      problem:
        "Brainstorming with AI tends to converge fast and stay shallow. I wanted to know whether the cues an AI gives mid-conversation could push groups toward broader, better ideas.",
      decision:
        "Rather than tune the model's answers, I varied how it conversed, the prompts and cues it offered, and measured the effect on what groups actually produced.",
      did: [
        "Designed and ran a 172-participant study on how LLM conversational cues shape group ideation.",
        "Published the findings at Collective Intelligence 2025.",
      ],
      tools: "Study design, LLM prompting, quantitative analysis.",
    },
  },
  {
    id: "information-seeking",
    title: "Information seeking",
    hook: "How people actually look for information, and where connected systems could make understanding deeper.",
    tags: ["Research", "Product Design"],
    year: "2023",
    status: "shipped",
    impact: "Research for Google, via Mindswarms.",
    note: "people don't want more results. they want to understand.",
    confidential: true,
    ...media("information-seeking"),
    detail: {
      problem:
        "People hunt for information across tools that don't talk to each other, and lose the thread. I studied how they actually seek and make sense of information, and where connecting existing systems could go deeper.",
      decision:
        "I focused on the moments understanding breaks down rather than on adding features, so the opportunities pointed at connecting what already exists.",
      did: [
        "Ran qualitative research on how people search for and make sense of information.",
        "Mapped where connecting existing systems could enable more efficient, deeper understanding.",
      ],
      tools: "Qualitative research, synthesis, concept mapping.",
    },
  },
];
