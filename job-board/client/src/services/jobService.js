const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function getJobs(params = {}) {
  const query = new URLSearchParams()

  if (params.q) {
    query.set('q', params.q)
  }
  if (params.location) {
    query.set('location', params.location)
  }

  const queryString = query.toString()
  const url = queryString ? `${API_URL}/jobs?${queryString}` : `${API_URL}/jobs`

  const response = await fetch(url)
  const result = await response.json()

 

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch jobs')
  }

  return result.data
}

async function getJobById(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`)
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch job')
  }

  return result.data
}

export { getJobs, getJobById }