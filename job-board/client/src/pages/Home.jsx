import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Code2,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import JobCard from '../components/JobCard.jsx'
import Navbar from '../components/Navbar.jsx'
import { getJobs } from '../services/jobService.js'

const categories = [
  {
    title: 'Software Development',
    jobs: '124 open jobs',
    icon: Code2,
  },
  {
    title: 'Marketing',
    jobs: '86 open jobs',
    icon: Megaphone,
  },
  {
    title: 'Data Analytics',
    jobs: '64 open jobs',
    icon: BarChart3,
  },
  {
    title: 'Fresher Roles',
    jobs: '142 open jobs',
    icon: GraduationCap,
  },
]

function Home() {
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    async function loadFeaturedJobs() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getJobs()
        if (!isCancelled) {
          setFeaturedJobs(data.slice(0, 3))
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

    loadFeaturedJobs()

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <main>
        <section id="categories" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Popular categories
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Explore jobs by category
                </h2>
              </div>
              <a
                href="#featured-jobs"
                className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
              >
                View featured jobs
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  icon={category.icon}
                  title={category.title}
                  jobs={category.jobs}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="featured-jobs" className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Featured jobs
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Fresh opportunities for candidates
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Find internships, fresher roles, and early-career jobs from
                teams looking for motivated candidates.
              </p>
            </div>

            {error ? (
              <div className="rounded-lg border border-dashed border-red-300 bg-red-50 p-8 text-center">
                <p className="font-semibold text-red-700">Couldn&apos;t load jobs</p>
                <p className="mt-2 text-sm text-red-600">{error}</p>
              </div>
            ) : isLoading ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="font-semibold text-slate-900">Loading jobs...</p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-3">
                {featuredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="for-employers" className="bg-white py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
              <Users className="text-blue-600" size={34} aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                For candidates
              </h2>
              <p className="mt-3 text-slate-600">
                Create a profile, browse matching jobs, and apply with your
                resume when the application system is added.
              </p>
              <button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                Create Candidate Profile
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
              <Building2 className="text-blue-600" size={34} aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                For employers
              </h2>
              <p className="mt-3 text-slate-600">
                Post jobs, manage applicants, and review candidate details from
                the employer dashboard in upcoming phases.
              </p>
              <button className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-blue-600">
                Start Hiring
              </button>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-12 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                <ShieldCheck size={18} aria-hidden="true" />
                Beginner-friendly full stack project
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Build one feature at a time with clean structure.
              </h2>
            </div>
            <Link
              to="/jobs"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-blue-50"
            >
              Explore Jobs
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div >
  )
}

export default Home