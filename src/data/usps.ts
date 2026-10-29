export interface CareerUSP {
  id: string
  /**
   * Inline-SVG icon key (rendered by CareerUSPSection.vue) — presentation
   * only: 'lightbulb' | 'target' | 'tools'. Keeps the section data-driven
   * without shipping emoji or an icon library.
   */
  icon: string
  title: string
  hook: string
  description: string
  highlights: string[]
}

export const careerUSPs: CareerUSP[] = [
  {
    id: 'innovation',
    icon: 'lightbulb',
    title: 'Innovation',
    hook: "Stay aligned with the technologies shaping today's careers.",
    description:
      'TKSR focuses on modern technologies, industry-relevant skills and practical implementation — so learners can build capabilities that reflect changing technology and workplace requirements.',
    highlights: ['Modern Technologies', 'Industry-Relevant Skills', 'Practical Implementation'],
  },
  {
    id: 'live-career-opportunities',
    icon: 'target',
    title: 'Live Career Opportunities',
    hook: 'Connect what you learn with what the job market needs.',
    description:
      "TKSR's career-focused approach connects learning with current job-market requirements, the skills in demand and the opportunities those skills lead toward. A dedicated career-opportunity feed is coming soon.",
    highlights: ['Current Job-Market Skills', 'Career Opportunities', 'Skills-to-Role Connection'],
  },
  {
    id: 'industry-experts-live-projects',
    icon: 'tools',
    title: 'Industry Experts + Live Projects',
    hook: 'Learn from experience. Build beyond theory.',
    description:
      'TKSR combines expert guidance with practical, industry-style projects — helping learners move from concepts to problem solving, implementation and portfolio-ready work.',
    highlights: ['Industry Expert Guidance', 'Real-World Projects', 'Portfolio-Oriented Learning'],
  },
]