import { Briefcase, Clock3, MapPin, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPostedDate } from '../utils/formatDate.js'

function JobCard({ job }) {
  
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">{job.company}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{job.title}</h3>
        </div>
        <span className="inline-flex w-fit items-center rounded-lg bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
          {job.type}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <MapPin size={17} aria-hidden="true" />
          {job.location}
        </p>
        <p className="flex items-center gap-2">
          <Wallet size={17} aria-hidden="true" />
          {job.salary}
        </p>
        <p className="flex items-center gap-2">
          <Clock3 size={17} aria-hidden="true" />
          {formatPostedDate(job.createdAt)}
        </p>
        <p className="flex items-center gap-2">
          <Briefcase size={17} aria-hidden="true" />
          {job.experience || 'Entry friendly'}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-blue-600"
      >
        View Details
      </Link>
    </article>
  )
}

export default JobCard