function CategoryCard({ icon: Icon, title, jobs }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-600 hover:shadow-md">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {Icon ? <Icon size={22} aria-hidden="true" /> : null}
      </span>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{jobs}</p>
    </div>
  )
}

export default CategoryCard