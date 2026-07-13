import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/useAuth.js'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await register(name, email, password, role)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto flex max-w-md flex-col px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Create an account</h1>
        <p className="mt-2 text-slate-600">
          Sign up as a candidate to apply for jobs, or as an employer to post
          them.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
            Full name
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">I am a...</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium ${
                  role === 'candidate'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-700'
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium ${
                  role === 'employer'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-700'
                }`}
              >
                Employer
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default Register