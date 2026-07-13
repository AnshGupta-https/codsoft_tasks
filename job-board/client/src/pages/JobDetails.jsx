import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock3,
  MapPin,
  Wallet,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { getJobById } from '../services/jobService.js'
import { formatPostedDate } from '../utils/formatDate.js'

function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    async function loadJob() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getJobById(id)
        if (!isCancelled) {
          setJob(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadJob()

    return () => {
      isCancelled = true
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Loading job details...
          </p>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Job not found
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            We could not find this job.
          </h1>
          <p className="mt-4 text-slate-600">
            The job may not exist, or the link may be incorrect.
          </p>
          <Link
            to="/jobs"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Jobs
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="bg-slate-950 px-6 py-14 text-white">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to jobs
            </Link>

            <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                  {job.company}
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight">
                  {job.title}
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300">{job.description}</p>
              </div>

              <button className="w-fit rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Job Description</h2>
              <p className="mt-4 leading-7 text-slate-600">{job.description}</p>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Responsibilities</h2>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Job Overview</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <p className="flex items-center gap-3">
                  <MapPin size={18} className="text-blue-600" aria-hidden="true" />
                  {job.location}
                </p>
                <p className="flex items-center gap-3">
                  <Briefcase size={18} className="text-blue-600" aria-hidden="true" />
                  {job.type}
                </p>
                <p className="flex items-center gap-3">
                  <Wallet size={18} className="text-blue-600" aria-hidden="true" />
                  {job.salary}
                </p>
                <p className="flex items-center gap-3">
                  <Clock3 size={18} className="text-blue-600" aria-hidden="true" />
                  Posted {formatPostedDate(job.createdAt)}
                </p>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Benefits</h2>
              <ul className="mt-4 space-y-3">
                {job.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default JobDetails