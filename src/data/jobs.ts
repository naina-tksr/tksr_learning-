export type JobStatus = 'open' | 'closing' | 'closed'
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  workMode: WorkMode
  skills: string[]
  experience: string
  status: JobStatus
  deadline: string
  /** ISO date (YYYY-MM-DD) the record was published — powers the "Recently Added" signal. */
  publishedAt?: string
  salaryRange?: string
  description: string
  responsibilities: string[]
  requirements: string[]
  applyUrl?: string
  programId?: string
  isDemo: boolean
}

/**
 * SAMPLE / DEMO opportunity records.
 *
 * These are NOT real job postings. Every record is marked `isDemo: true` and the
 * UI must always communicate that this data is for demonstration only. Exchange
 * this file with real data (or an API response) in a future backend phase.
 */
export const jobs: Job[] = [
  {
    id: 'data-analyst-demo',
    title: 'Data Analyst',
    company: 'DataForge Demo',
    location: 'Remote (India)',
    workMode: 'Remote',
    skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Data Analysis'],
    experience: '1-3 Years',
    status: 'open',
    deadline: '2026-12-31',
    publishedAt: '2026-09-01',
    description:
      'Sample opportunity for demonstration only. In this demo role, a Data Analyst would transform raw data into reports and dashboards that inform decisions. This record is example data to illustrate how TKSR connects roles with the skills you can learn — no company is currently hiring through TKSR for this listing.',
    responsibilities: [
      'Collect and clean data from multiple sources',
      'Build dashboards and reports in Power BI',
      'Query data using SQL for analysis and validation',
      'Summarize findings for non-technical stakeholders',
    ],
    requirements: [
      'Python and SQL fundamentals',
      'Working knowledge of Excel and Power BI',
      'Data analysis and storytelling skills',
      'Ability to present insights clearly',
    ],
    isDemo: true,
  },
  {
    id: 'ml-engineer-demo',
    title: 'Machine Learning Engineer',
    company: 'AI Solutions Demo',
    location: 'Bengaluru',
    workMode: 'Hybrid',
    skills: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'SQL'],
    experience: '2-4 Years',
    status: 'open',
    deadline: '2026-11-30',
    publishedAt: '2026-08-20',
    description:
      'Sample opportunity for demonstration only. This demo record represents a Machine Learning Engineer role focused on building and evaluating models. It exists to show how TKSR career pathways connect to modern skills — it is not a live job posting.',
    responsibilities: [
      'Prepare and explore datasets with Pandas',
      'Train and evaluate ML models with Scikit-learn',
      'Engineer features to improve model performance',
      'Collaborate with engineers on model API integration',
    ],
    requirements: [
      'Python and Pandas proficiency',
      'Hands-on Scikit-learn experience',
      'SQL basics for data retrieval',
      'Understanding of model evaluation metrics',
    ],
    isDemo: true,
  },
  {
    id: 'cloud-devops-demo',
    title: 'Cloud / DevOps Engineer',
    company: 'CloudWorks Demo',
    location: 'Remote (India)',
    workMode: 'Remote',
    skills: ['Azure', 'Docker', 'CI/CD', 'Linux', 'Cloud'],
    experience: '1-3 Years',
    status: 'closing',
    deadline: '2026-09-28',
    publishedAt: '2026-09-20',
    programId: 'devops-cert',
    description:
      'Sample opportunity for demonstration only. This demo role represents the kind of Cloud / DevOps work TKSR programs prepare learners for, from CI/CD to containerization. It is not a live job posting and no company is currently hiring through TKSR for this listing.',
    responsibilities: [
      'Build and maintain CI/CD pipelines',
      'Containerize applications with Docker',
      'Manage cloud infrastructure basics on Azure',
      'Automate deployments and monitoring',
    ],
    requirements: [
      'Linux and shell scripting fundamentals',
      'Docker and CI/CD concepts',
      'Cloud platform basics (Azure, AWS or GCP)',
      'Monitoring and troubleshooting mindset',
    ],
    isDemo: true,
  },
  {
    id: 'genai-developer-demo',
    title: 'GenAI / LLM Developer',
    company: 'CareerTech Demo',
    location: 'Gurugram',
    workMode: 'Hybrid',
    skills: ['Python', 'Generative AI', 'LLM', 'APIs', 'Prompt Engineering'],
    experience: '2-4 Years',
    status: 'open',
    deadline: '2026-12-15',
    publishedAt: '2026-09-18',
    description:
      'Sample opportunity for demonstration only. This demo record represents a GenAI-focused developer role that works with LLMs and APIs. It demonstrates the kind of emerging skill set TKSR career content can lead toward — not a live job posting.',
    responsibilities: [
      'Build LLM-powered features using APIs',
      'Design effective prompts for product use cases',
      'Integrate AI services into applications',
      'Evaluate outputs for quality and safety',
    ],
    requirements: [
      'Python and API integration experience',
      'Familiarity with LLMs and prompt engineering',
      'Understanding of AI output evaluation',
      'Ability to iterate quickly with feedback',
    ],
    isDemo: true,
  },
  {
    id: 'qa-automation-demo',
    title: 'QA Automation Engineer',
    company: 'TKSR Demo Labs',
    location: 'Noida',
    workMode: 'On-site',
    skills: ['Python', 'Selenium', 'API Testing', 'Automation Testing'],
    experience: '1-2 Years',
    status: 'open',
    deadline: '2026-11-20',
    publishedAt: '2026-09-22',
    programId: 'testing-course',
    description:
      'Sample opportunity for demonstration only. This demo role represents a QA Automation position aligned with TKSR software-testing programs. It is sample data used to show how automation-testing skills connect to real-world roles — not a live job posting.',
    responsibilities: [
      'Automate web test suites with Selenium',
      'Design and execute API test cases',
      'Maintain test frameworks and reports',
      'Integrate tests into CI pipelines',
    ],
    requirements: [
      'Python programming basics',
      'Selenium or similar automation experience',
      'API testing tools and techniques',
      'Attention to detail in defect tracking',
    ],
    isDemo: true,
  },
  {
    id: 'scrum-master-demo',
    title: 'Scrum Master',
    company: 'TKSR Demo Labs',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    skills: ['Agile', 'Scrum', 'Jira', 'Kanban', 'Stakeholder Collaboration'],
    experience: '2-5 Years',
    status: 'closing',
    deadline: '2026-10-30',
    publishedAt: '2026-09-10',
    programId: 'scrum-master',
    description:
      'Sample opportunity for demonstration only. This demo record represents a Scrum Master role aligned with TKSR Agile & Scrum programs. It demonstrates how agile skills map to career roles — it is not a live job posting.',
    responsibilities: [
      'Facilitate sprint ceremonies and planning',
      'Coach teams on agile practices',
      'Track progress in Jira and report metrics',
      'Remove impediments and manage stakeholder expectations',
    ],
    requirements: [
      'Strong Scrum and agile knowledge',
      'Jira or similar tooling experience',
      'Facilitation and coaching skills',
      'Cross-functional communication ability',
    ],
    isDemo: true,
  },
  {
    id: 'project-manager-demo',
    title: 'Project Manager',
    company: 'IndustryWorks Demo',
    location: 'Delhi NCR',
    workMode: 'On-site',
    skills: ['Project Management', 'Risk Management', 'Stakeholder Management', 'Budgeting', 'Reporting'],
    experience: '3-6 Years',
    status: 'closed',
    deadline: '2026-08-15',
    publishedAt: '2026-07-20',
    programId: 'pmp-cert',
    description:
      'Sample opportunity for demonstration only. This demo record represents a Project Manager role aligned with TKSR Project Management programs. It exists to illustrate career pathways — no company is currently hiring through TKSR for this listing.',
    responsibilities: [
      'Plan, scope and schedule project deliverables',
      'Manage risk registers and mitigation plans',
      'Track budgets and report progress',
      'Align stakeholders across teams',
    ],
    requirements: [
      'Project management fundamentals (PMP-style)',
      'Risk and budget management experience',
      'Strong reporting and communication skills',
      'Experience leading cross-functional teams',
    ],
    isDemo: true,
  },
]