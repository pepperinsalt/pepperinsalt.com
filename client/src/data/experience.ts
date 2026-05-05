export interface ExperienceJob {
  period: string;
  type: string;
  title: string;
  company: string;
  location: string;
  highlights: string[];
  tags: string[];
}

export const EXPERIENCE_JOBS: ExperienceJob[] = [
  {
    period: "2026 – Present",
    type: "Contract",
    title: "Web Support & Ad Operations Specialist",
    company: "Altaracks",
    location: "Remote",
    highlights: [
      "Manage and optimize WordPress site architecture for performance and SEO",
      "Design and deploy digital ad creatives across Google and Meta platforms",
      "Build and maintain lead generation funnels and landing pages",
      "Implement tracking pixels, UTM parameters, and conversion reporting",
    ],
    tags: ["WordPress", "Google Ads", "Meta Ads", "SEO", "Lead Gen"],
  },
  {
    period: "2024 – Present",
    type: "Full-Time",
    title: "Technical Infrastructure Specialist",
    company: "Self-Directed / Commercial Projects",
    location: "Salt Lake City, UT",
    highlights: [
      "Install and terminate commercial Cat6/Cat6A structured cabling systems",
      "Configure and deploy network switches, patch panels, and access points",
      "Troubleshoot complex network topology issues in commercial environments",
      "Apply systematic, process-driven discipline to every installation",
    ],
    tags: [
      "Cat6 Cabling",
      "Network Config",
      "Troubleshooting",
      "Infrastructure",
    ],
  },
  {
    period: "2023",
    type: "Contract",
    title: "Email Automation Specialist",
    company: "Artisan Talent",
    location: "Remote",
    highlights: [
      "Reduced manual email workload by 60% through CSV-driven automation",
      "Built reusable, modular HTML email template library",
      "Implemented dynamic content blocks using AMPscript and Liquid",
      "Audited and cleaned contact lists, improving deliverability by 18%",
    ],
    tags: ["AMPscript", "Liquid", "HTML Email", "Automation", "List Hygiene"],
  },
  {
    period: "2014 – 2018",
    type: "Full-Time",
    title: "Email & Front-End Developer",
    company: "CHG Healthcare",
    location: "Salt Lake City, UT",
    highlights: [
      "Led full migration from table-based to responsive email design across all brands",
      "Integrated Salesforce Marketing Cloud as primary ESP for 250k+ contact database",
      "Built and maintained automated nurture journeys for healthcare professional recruitment",
      "Developed custom AMPscript logic for dynamic personalization at scale",
      "Collaborated with design, content, and compliance teams on 50+ campaigns per year",
      "Managed A/B testing program, improving average open rates from 18% to 31%",
    ],
    tags: [
      "Salesforce MC",
      "AMPscript",
      "Responsive Email",
      "A/B Testing",
      "CRM",
      "HTML/CSS",
    ],
  },
  {
    period: "2010 – 2014",
    type: "Full-Time",
    title: "Digital Marketing Coordinator",
    company: "Various Agencies",
    location: "Salt Lake City, UT",
    highlights: [
      "Managed email campaigns for retail, entertainment, and hospitality clients",
      "Built HTML email templates from PSD mockups using table-based layouts",
      "Coordinated campaign scheduling, list segmentation, and reporting",
      "Supported clients including Simon Malls, Sorenson, and Arenawins",
    ],
    tags: ["Email Marketing", "HTML", "Campaign Management", "Reporting"],
  },
];

export interface HomeExperienceJob {
  period: string;
  title: string;
  company: string;
  desc: string;
}

export const HOME_EXPERIENCE_JOBS: HomeExperienceJob[] = [
  {
    period: "2026 – Present (Contract)",
    title: "Web Support & Ad Ops",
    company: "Altaracks",
    desc: "Managing WordPress architecture, ad creatives, and lead gen optimization.",
  },
  {
    period: "2024 – Present",
    title: "Technical Infrastructure Specialist",
    company: "Self-Directed",
    desc: "Data cabling & network logic. Sharpening troubleshooting & process discipline.",
  },
  {
    period: "2023 · Artisan Talent",
    title: "Email Automation Specialist",
    company: "Contract",
    desc: "Reduced manual workload by 60% via CSV automation & reusable templates.",
  },
  {
    period: "2014–2018 · CHG Healthcare",
    title: "Email & Front-End Developer",
    company: "Full-Time",
    desc: "Led responsive migration & Salesforce ESP integration. Managed 250k+ contact lists.",
  },
];
