import { useEffect, useMemo, useState } from 'react'
import { MapPin, Search, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import JobCard from '../components/JobCard.jsx'
import JobFilterSidebar from '../components/JobFilterSidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import { getJobs } from '../services/jobService.js'

function Jobs() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchText, setSearchText] = useState(searchParams.get('q') || '')
    const [locationText, setLocationText] = useState(
        searchParams.get('location') || '',
    )

    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isCancelled = false

        async function loadJobs() {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getJobs()

               

                if (!isCancelled) {
                    setJobs(data)
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

        loadJobs()

        return () => {
            isCancelled = true
        }
    }, [])

    const normalizedSearchText = searchText.trim().toLowerCase()
    const normalizedLocationText = locationText.trim().toLowerCase()

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const searchableText = [
                job.title,
                job.company,
                job.type,
                job.experience,
                job.description,
                ...job.tags,
            ]
                .join(' ')
                .toLowerCase()

            const matchesSearch =
                normalizedSearchText === '' ||
                searchableText.includes(normalizedSearchText)

            const matchesLocation =
                normalizedLocationText === '' ||
                job.location.toLowerCase().includes(normalizedLocationText)

            return matchesSearch && matchesLocation
        })
    }, [jobs, normalizedSearchText, normalizedLocationText])

    const hasSearch = normalizedSearchText !== '' || normalizedLocationText !== ''

    function handleSearchSubmit(event) {
        event.preventDefault()

        const nextParams = new URLSearchParams()

        if (searchText.trim() !== '') {
            nextParams.set('q', searchText.trim())
        }

        if (locationText.trim() !== '') {
            nextParams.set('location', locationText.trim())
        }

        setSearchParams(nextParams)
    }

    function handleClearSearch() {
        setSearchText('')
        setLocationText('')
        setSearchParams({})
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main>
                <section className="bg-slate-950 px-6 py-14 text-white">
                    <div className="mx-auto max-w-6xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                            Job listings
                        </p>
                        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight">
                            Explore jobs from companies hiring fresh talent.
                        </h1>
                        <p className="mt-4 max-w-2xl text-slate-300">
                            Review internships, fresher roles, and full-time openings in one
                            organized place.
                        </p>

                        <form
                            onSubmit={handleSearchSubmit}
                            className="mt-8 grid gap-3 rounded-lg bg-white p-3 text-slate-900 shadow-lg md:grid-cols-[1fr_1fr_auto]"
                        >
                            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
                                <Search size={20} className="text-slate-400" aria-hidden="true" />
                                <input
                                    type="text"
                                    placeholder="Search by job title, company, or skill"
                                    value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)}
                                    className="w-full border-0 outline-none"
                                />
                            </label>
                            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
                                <MapPin size={20} className="text-slate-400" aria-hidden="true" />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={locationText}
                                    onChange={(event) => setLocationText(event.target.value)}
                                    className="w-full border-0 outline-none"
                                />
                            </label>
                            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                                Search Jobs
                            </button>
                        </form>
                    </div>
                </section>

                <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[280px_1fr]">
                    <JobFilterSidebar />

                    <div>
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                    Available roles
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                    {isLoading ? 'Loading jobs...' : `${filteredJobs.length} jobs found`}
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                {hasSearch && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-blue-600 hover:text-blue-600"
                                    >
                                        <X size={16} aria-hidden="true" />
                                        Clear
                                    </button>
                                )}
                                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-600 sm:w-44">
                                    <option>Newest first</option>
                                    <option>Salary range</option>
                                    <option>Remote jobs</option>
                                </select>
                            </div>
                        </div>

                        {error ? (
                            <div className="rounded-lg border border-dashed border-red-300 bg-red-50 p-8 text-center">
                                <p className="text-lg font-semibold text-red-700">
                                    Couldn&apos;t load jobs
                                </p>
                                <p className="mt-2 text-red-600">{error}</p>
                                <p className="mt-2 text-sm text-red-500">
                                    Make sure your backend server is running on the URL set in
                                    client/.env.
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
                                <p className="text-lg font-semibold text-slate-900">
                                    Loading jobs...
                                </p>
                            </div>
                        ) : filteredJobs.length > 0 ? (
                            <div className="grid gap-6 xl:grid-cols-2">
                                {filteredJobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
                                <p className="text-lg font-semibold text-slate-900">
                                    No jobs found
                                </p>
                                <p className="mt-2 text-slate-600">
                                    Try a different job title, company, skill, or location.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Jobs