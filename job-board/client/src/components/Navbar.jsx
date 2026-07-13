import { Briefcase, Menu } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Briefcase size={20} aria-hidden="true" />
          </span>
          JobBoard
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <NavLink to="/jobs" className={navLinkClass}>
            Jobs
          </NavLink>
          <a href="/#categories" className="hover:text-blue-600">
            Categories
          </a>
          <a href="/#for-employers" className="hover:text-blue-600">
            Employers
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm font-medium text-slate-700">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden">
          <Menu size={20} aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar