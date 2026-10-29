import type { CareerProject } from '../data/projects'
import { projects } from '../data/projects'

/**
 * API-ready project service.
 *
 * UI components only depend on these async methods. When a real backend is
 * introduced, swap the implementations for `fetch('/api/projects')` /
 * `fetch('/api/projects/:id')` without changing any component code.
 */
export async function getProjects(): Promise<CareerProject[]> {
  // TODO(future): return fetch('/api/projects').then((r) => r.json())
  return projects
}

export async function getProjectById(id: string): Promise<CareerProject | undefined> {
  // TODO(future): return fetch(`/api/projects/${id}`).then((r) => r.json())
  return projects.find((project) => project.id === id)
}