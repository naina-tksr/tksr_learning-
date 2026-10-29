export interface Expert {
  id: string
  name: string
  role: string
  expertise: string[]
  experience: string
  bio: string
  technologies: string[]
  image?: string
  linkedinUrl?: string
  isDemo: boolean
}

/**
 * SAMPLE / DEMO expert profiles.
 *
 * These are fictional demonstration identities used to illustrate the kind of
 * practitioner guidance TKSR programs are built around. They are NOT verified
 * real people, and the UI must always communicate that this is sample content.
 * `isDemo: true` marks every record so it can never be confused with verified
 * data from a future backend.
 */
export const experts: Expert[] = [
  {
    id: 'aarav-malhotra-demo',
    name: 'Aarav Malhotra',
    role: 'Cloud & DevOps Practitioner',
    expertise: ['Cloud Engineering', 'CI/CD Pipelines', 'Infrastructure as Code'],
    experience: '8+ Years (Sample)',
    bio: 'Sample profile for demonstration. This practitioner represents the kind of hands-on, industry-style guidance TKSR programs are built around — from containerization and release automation to cloud infrastructure.',
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'Azure'],
    isDemo: true,
  },
  {
    id: 'sneha-kapoor-demo',
    name: 'Sneha Kapoor',
    role: 'Data & Machine Learning Practitioner',
    expertise: ['Data Analysis', 'Machine Learning', 'ML Pipelines'],
    experience: '7+ Years (Sample)',
    bio: 'Sample profile for demonstration. This practitioner illustrates how applied data and ML work flows through real projects — from messy datasets to models with measurable outcomes.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Power BI', 'SQL'],
    isDemo: true,
  },
  {
    id: 'rohan-desai-demo',
    name: 'Rohan Desai',
    role: 'Product & Agile Practitioner',
    expertise: ['Agile Transformation', 'Product Ownership', 'Stakeholder Collaboration'],
    experience: '10+ Years (Sample)',
    bio: 'Sample profile for demonstration. This practitioner reflects career-oriented agile coaching — turning backlogs and ceremonies into delivery that stakeholders can see and trust.',
    technologies: ['Scrum', 'Jira', 'Kanban', 'Roadmapping'],
    isDemo: true,
  },
  {
    id: 'meera-nair-demo',
    name: 'Meera Nair',
    role: 'QA & Automation Practitioner',
    expertise: ['Test Automation', 'API Testing', 'Quality Engineering'],
    experience: '6+ Years (Sample)',
    bio: 'Sample profile for demonstration. This practitioner models how QA automation skills move beyond theory — designing test suites that teams can actually rely on.',
    technologies: ['Selenium', 'Python', 'Postman', 'JMeter'],
    isDemo: true,
  },
  {
    id: 'kabir-sethi-demo',
    name: 'Kabir Sethi',
    role: 'Applied Cloud & GenAI Practitioner',
    expertise: ['Generative AI', 'LLM Applications', 'Applied Cloud'],
    experience: '9+ Years (Sample)',
    bio: 'Sample profile for demonstration. This practitioner represents guidance on emerging work — integrating LLM capabilities with practical, production-minded thinking.',
    technologies: ['Python', 'LLM APIs', 'Prompt Engineering', 'Cloud Services'],
    isDemo: true,
  },
]