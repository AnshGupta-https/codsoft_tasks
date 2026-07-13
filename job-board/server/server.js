import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import connectDB from './config/db.js'
import applicationRoutes from './routes/applicationRoutes.js'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config({ quiet: true })

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing. Add it to your server/.env file before starting the server.')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.get('/', (req, res) => {
  res.send('Job Board API is running')
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
  })
})

app.use('/api/jobs', jobRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})