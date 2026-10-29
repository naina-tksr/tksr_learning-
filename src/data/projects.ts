export interface CareerProject {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  skills: string[]
  projectStages: string[]
  outcome: string
  portfolioValue: string
  careerRelevance?: string
  isDemo: boolean
}

/**
 * SAMPLE / DEMO career projects.
 *
 * These are demonstration project-blueprints used to illustrate the journey
 * Concept → Problem → Build → Deploy → Portfolio. They are NOT client work,
 * production systems or guaranteed outcomes, and the UI must always label them
 * as sample content.
 */
export const projects: CareerProject[] = [
  {
    id: 'analytics-sales-dashboard',
    title: 'Sales Analytics Dashboard',
    category: 'Data Analytics',
    description:
      'A sample project to turn raw sales data into a decision-ready dashboard — from messy source data to clean, shareable insights.',
    technologies: ['Python', 'SQL', 'Power BI'],
    skills: ['Data Cleaning', 'Data Visualization', 'Insights Reporting'],
    projectStages: ['Concept', 'Problem', 'Build', 'Deploy', 'Portfolio'],
    outcome:
      'A portfolio-ready analytics dashboard demonstrating an end-to-end data workflow (sample project, not client work).',
    portfolioValue: 'Shows recruiters data cleaning, analysis and storytelling skills.',
    careerRelevance: 'Aligns with Data Analyst-style roles and the skills they demand.',
    isDemo: true,
  },
  {
    id: 'ml-churn-prediction',
    title: 'ML Customer Churn Prediction',
    category: 'Machine Learning',
    description:
      'A sample machine-learning workflow to predict customer churn — from exploratory analysis and feature engineering to model evaluation.',
    technologies: ['Python', 'Pandas', 'Scikit-learn'],
    skills: ['Feature Engineering', 'Model Evaluation', 'Classification'],
    projectStages: ['Concept', 'Problem', 'Build', 'Deploy', 'Portfolio'],
    outcome: 'A trained churn model with an evaluation report, ready to present in a portfolio (sample).',
    portfolioValue: 'Demonstrates a practical ML workflow and model judgment.',
    careerRelevance: 'Aligns with Machine Learning Engineer-style roles.',
    isDemo: true,
  },
  {
    id: 'genai-support-assistant',
    title: 'GenAI Support Assistant',
    category: 'Generative AI / LLM',
    description:
      'Build a sample AI support assistant: design prompts, integrate an LLM API and evaluate response quality.',
    technologies: ['Python', 'LLM APIs', 'Prompt Engineering'],
    skills: ['Prompt Design', 'API Integration', 'Output Evaluation'],
    projectStages: ['Concept', 'Problem', 'Build', 'Deploy', 'Portfolio'],
    outcome: 'A working assistant prototype with a prompt playbook and evaluation notes (sample).',
    portfolioValue: 'Evidence of applied Generative AI and API integration skill.',
    careerRelevance: 'Aligns with GenAI / LLM Developer-style roles.',
    isDemo: true,
  },
  {
    id: 'cloud-cicd-pipeline',
    title: 'Cloud CI/CD Pipeline Build',
    category: 'Cloud / DevOps',
    description:
      'Create a sample CI/CD pipeline that containerizes a small app, provisions cloud infrastructure with code and deploys automatically.',
    technologies: ['Docker', 'GitHub Actions', 'Terraform', 'AWS'],
    skills: ['Containerization', 'Infrastructure as Code', 'Automation'],
    projectStages: ['Concept', 'Problem', 'Build', 'Deploy', 'Portfolio'],
    outcome:
      'An automated deploy pipeline with infrastructure-as-code — sample project, not tied to live production.',
    portfolioValue: 'Signals containerization, automation and cloud fundamentals.',
    careerRelevance: 'Aligns with Cloud / DevOps Engineer-style roles.',
    isDemo: true,
  },
  {
    id: 'qa-automation-suite',
    title: 'QA Automation Test Suite',
    category: 'QA Automation',
    description:
      'Build a sample automated test suite covering a web-app flow and an API — from test design to clean reports.',
    technologies: ['Python', 'Selenium', 'Postman'],
    skills: ['Test Case Design', 'Automation Scripting', 'API Testing'],
    projectStages: ['Concept', 'Problem', 'Build', 'Deploy', 'Portfolio'],
    outcome: 'A reusable test framework with passing suites and reporting (sample).',
    portfolioValue: 'Demonstrates structured automation and quality thinking.',
    careerRelevance: 'Aligns with QA Automation Engineer-style roles.',
    isDemo: true,
  },
  {
    id: 'agile-product-roadmap',
    title: 'Agile Product Roadmap',
    category: 'Project / Product Management',
    description:
      'Plan a sample product release: build a roadmap, manage a backlog and align stakeholders through structured agile ceremonies.',
    technologies: ['Scrum', 'Jira', 'Confluence'],
    skills: ['Backlog Management', 'Stakeholder Alignment', 'Roadmapping'],
    projectStages: ['Concept', 'Problem', 'Build', 'Deploy', 'Portfolio'],
    outcome:
      'A documented roadmap, prioritized backlog and stakeholder playbook (sample).',
    portfolioValue: 'Shows planning, prioritization and collaboration skill.',
    careerRelevance: 'Aligns with Scrum Master / Project Manager-style roles.',
    isDemo: true,
  },
]