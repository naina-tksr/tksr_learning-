export interface Course {
  id: string
  title: string
  category: string
  summary: string
  duration: string
  level: string
  rating: number
  learners: string
  price: string
  tags: string[]
  icon: string
}

export const CATEGORIES = [
  'All Courses',
  'DevOps',
  'Agile and Scrum',
  'Software Testing',
  'Interview Preparation Bootcamp',
  'Project Management',
] as const

export const courses: Course[] = [
  {
    id: 'devops-cert',
    title: 'DevOps Certification Training',
    category: 'DevOps',
    summary:
      'Master CI/CD, Docker, Kubernetes, Terraform and AWS to ship software faster with release engineering confidence.',
    duration: '6 Months',
    level: 'All Levels',
    rating: 4.8,
    learners: '12,400',
    price: '₹49,999',
    tags: ['CI/CD', 'Docker', 'Kubernetes', 'AWS'],
    icon: '🚀',
  },
  {
    id: 'docker-k8s',
    title: 'Docker & Kubernetes Bootcamp',
    category: 'DevOps',
    summary:
      'Hands-on containerization and orchestration — from your first Dockerfile to production-grade clusters on the cloud.',
    duration: '3 Months',
    level: 'Intermediate',
    rating: 4.7,
    learners: '8,100',
    price: '₹29,999',
    tags: ['Docker', 'Kubernetes', 'Helm'],
    icon: '🐳',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud & DevOps Engineering',
    category: 'DevOps',
    summary:
      'Architect and automate scalable AWS environments using IaC, monitoring and security best practices used in real firms.',
    duration: '5 Months',
    level: 'Intermediate',
    rating: 4.9,
    learners: '9,600',
    price: '₹44,999',
    tags: ['AWS', 'Terraform', 'Monitoring'],
    icon: '☁️',
  },
  {
    id: 'scrum-master',
    title: 'Scrum Master Certification (CSM)',
    category: 'Agile and Scrum',
    summary:
      'Become a Certified Scrum Master with live sprints, agile ceremonies, and real backlogs from global product teams.',
    duration: '2 Months',
    level: 'Beginner',
    rating: 4.6,
    learners: '15,200',
    price: '₹21,999',
    tags: ['Scrum', 'Agile', 'CSM'],
    icon: '🏃',
  },
  {
    id: 'po-bootcamp',
    title: 'Product Owner Interview Ready Bootcamp',
    category: 'Interview Preparation Bootcamp',
    summary:
      'A 4-week intensive sprint to crack Product Owner interviews — mock rounds, story mapping and portfolio reviews.',
    duration: '4 Weeks',
    level: 'Intermediate',
    rating: 4.8,
    learners: '3,900',
    price: '₹14,999',
    tags: ['Mock Interviews', 'Story Mapping', 'PO'],
    icon: '🎯',
  },
  {
    id: 'sm-bootcamp',
    title: 'Scrum Master Interview Ready Bootcamp',
    category: 'Interview Preparation Bootcamp',
    summary:
      'Crack Scrum Master interviews with real scenario questions, live mock interviews and expert feedback loops.',
    duration: '4 Weeks',
    level: 'Intermediate',
    rating: 4.7,
    learners: '4,200',
    price: '₹14,999',
    tags: ['Mock Interviews', 'Scrum Scenarios'],
    icon: '🧭',
  },
  {
    id: 'testing-course',
    title: 'Software & Automation Testing Course',
    category: 'Software Testing',
    summary:
      'Manual + Automation testing with Selenium, Java, API testing and framework design for interview-ready testers.',
    duration: '5 Months',
    level: 'Beginner',
    rating: 4.7,
    learners: '11,800',
    price: '₹29,999',
    tags: ['Selenium', 'Java', 'API Testing'],
    icon: '🧪',
  },
  {
    id: 'pmp-cert',
    title: 'PMP® Certification with Exam Prep',
    category: 'Project Management',
    summary:
      'A structured journey to pass PMP on the first attempt with live coaching, exam simulations and study plans.',
    duration: '3 Months',
    level: 'All Levels',
    rating: 4.9,
    learners: '7,500',
    price: '₹26,999',
    tags: ['PMP', 'Exam Prep', 'PMBOK'],
    icon: '📋',
  },
  {
    id: 'pm-bootcamp',
    title: 'Project Manager Interview Ready Bootcamp',
    category: 'Interview Preparation Bootcamp',
    summary:
      'Ace PM interviews with case-based mock rounds, estimation drills and leadership scenario practice.',
    duration: '4 Weeks',
    level: 'Intermediate',
    rating: 4.6,
    learners: '2,800',
    price: '₹13,999',
    tags: ['Mock Interviews', 'Cases'],
    icon: '📈',
  },
  {
    id: 'agile-pm',
    title: 'Agile & DevOps Interview Prep Bootcamp',
    category: 'Interview Preparation Bootcamp',
    summary:
      'Combines agile coaching and DevOps technical questions with recruiter feedback to get you job-ready fast.',
    duration: '4 Weeks',
    level: 'Intermediate',
    rating: 4.7,
    learners: '5,100',
    price: '₹15,999',
    tags: ['Agile', 'DevOps', 'Mocks'],
    icon: '⚡',
  },
  {
    id: 'agile-foundations',
    title: 'Agile & Scrum Foundations',
    category: 'Agile and Scrum',
    summary:
      'Understand agile values, ceremonies, estimation and scaling frameworks with team-based live simulations.',
    duration: '6 Weeks',
    level: 'Beginner',
    rating: 4.5,
    learners: '6,400',
    price: '₹9,999',
    tags: ['Agile', 'Scrum', 'Kanban'],
    icon: '🔄',
  },
  {
    id: 'api-automation',
    title: 'API & Performance Testing Bootcamp',
    category: 'Software Testing',
    summary:
      'Automate REST API tests and load-test enterprise systems with Postman, Rest Assured and JMeter.',
    duration: '2 Months',
    level: 'Intermediate',
    rating: 4.6,
    learners: '3,300',
    price: '₹12,999',
    tags: ['Postman', 'Rest Assured', 'JMeter'],
    icon: '🔌',
  },
]

export const hiringPartners = [
  { name: 'Google', color: '#4285F4' },
  { name: 'Stanford', color: '#B1060F' },
  { name: 'IBM', color: '#1F70C1' },
  { name: 'Infosys', color: '#0C9DE0' },
  { name: 'Accenture', color: '#A100FF' },
  { name: 'Capgemini', color: '#0C7AB1' },
  { name: 'Deloitte', color: '#86BC25' },
  { name: 'TCS', color: '#2C66B3' },
  { name: 'Microsoft', color: '#737373' },
  { name: 'Amazon', color: '#FF9900' },
  { name: 'Cognizant', color: '#3B5B7B' },
  { name: 'Wipro', color: '#5B2E91' },
]

export const SITE = {
  name: 'TKSR Learning',
  phone: '+919013191313',
  phoneHref: 'tel:+919013191313',
  whatsapp: 'https://wa.me/919013191313',
  email: 'info@tksrproductservices.com',
  address: 'Gurugram, Haryana',
}