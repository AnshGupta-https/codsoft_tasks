import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// POST /api/auth/register
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      })
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === 'employer' ? 'employer' : 'candidate',
    })

    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    })
  }
}

// POST /api/auth/login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = generateToken(user._id)

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    })
  }
}

// GET /api/auth/me (protected)
async function getCurrentUser(req, res) {
  res.json({
    success: true,
    data: req.user,
  })
}

export { registerUser, loginUser, getCurrentUser }