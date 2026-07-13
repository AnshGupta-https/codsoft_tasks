import { Filter } from 'lucide-react'

const jobTypes = ['Full Time', 'Internship', 'Remote']
const locations = ['Bengaluru', 'Hyderabad', 'Pune', 'Remote']
const experienceLevels = ['Fresher', '0 - 1 year', '1 - 2 years']

function JobFilterSidebar() {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Filter size={20} className="text-blue-600" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Job type
          </h3>
          <div className="space-y-3">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Location
          </h3>
          <div className="space-y-3">
            {locations.map((location) => (
              <label
                key={location}
                className="flex items-center gap-3 text-sm text-slate-700"
              >
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                {location}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Experience
          </h3>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-600">
            <option value="">Any experience</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          Apply Filters
        </button>
      </div>
    </aside>
  )
}

export default JobFilterSidebar