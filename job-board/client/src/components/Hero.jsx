import { MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const params = new URLSearchParams()

    if (keyword.trim() !== '') {
      params.set('q', keyword.trim())
    }

    if (location.trim() !== '') {
      params.set('location', location.trim())
    }

    const queryString = params.toString()
    navigate(queryString ? `/jobs?${queryString}` : '/jobs')
  }
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-300">
            Find your next opportunity
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Discover jobs that match your skills and career goals.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Browse beginner-friendly internships, fresher roles, and full-time
            jobs from growing companies.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-3 rounded-lg bg-white p-3 text-slate-900 shadow-lg sm:grid-cols-[1fr_1fr_auto]"
          >
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <Search size={20} className="text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="w-full border-0 outline-none"
              />
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <MapPin size={20} className="text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full border-0 outline-none"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Search size={18} aria-hidden="true" />
              Find Jobs
            </button>
          </form>
        </div>

        <div className="grid gap-4 rounded-lg border border-white/10 bg-white/5 p-5">
          <div className="rounded-lg bg-white p-5 text-slate-900">
            <p className="text-sm font-semibold text-slate-500">Live openings</p>
            <p className="mt-2 text-3xl font-bold">2,400+</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-blue-500 p-5">
              <p className="text-sm text-blue-50">Companies</p>
              <p className="mt-2 text-2xl font-bold">320+</p>
            </div>
            <div className="rounded-lg bg-emerald-500 p-5">
              <p className="text-sm text-emerald-50">Remote jobs</p>
              <p className="mt-2 text-2xl font-bold">850+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero