import type { Job } from '../data/jobs'
import { jobs } from '../data/jobs'

/**
 * API-ready job service.
 *
 * The UI components only depend on these async methods. When a real backend is
 * introduced, swap the implementations for `fetch('/api/jobs')` / `fetch('/api/jobs/:id')`
 * without changing any component code.
 */
export async function getJobs(): Promise<Job[]> {
  // TODO(future): return fetch('/api/jobs').then((r) => r.json())
  return jobs
}

export async function getJobById(id: string): Promise<Job | undefined> {
  // TODO(future): return fetch(`/api/jobs/${id}`).then((r) => r.json())
  return jobs.find((job) => job.id === id)
}