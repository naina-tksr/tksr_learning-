import type { Expert } from '../data/experts'
import { experts } from '../data/experts'

/**
 * API-ready expert service.
 *
 * UI components only depend on these async methods. When a real backend is
 * introduced, swap the implementations for `fetch('/api/experts')` /
 * `fetch('/api/experts/:id')` without changing any component code.
 */
export async function getExperts(): Promise<Expert[]> {
  // TODO(future): return fetch('/api/experts').then((r) => r.json())
  return experts
}

export async function getExpertById(id: string): Promise<Expert | undefined> {
  // TODO(future): return fetch(`/api/experts/${id}`).then((r) => r.json())
  return experts.find((expert) => expert.id === id)
}