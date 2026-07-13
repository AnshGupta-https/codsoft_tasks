// Run with: npm run seed
// Connects to MongoDB, clears the jobs collection, and inserts sample jobs
// so there is real data to test the API and (later) the frontend with.
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Job from '../models/Job.js'
import jobsData from './jobsData.js'

dotenv.config({ quiet: true })

async function seed() {
  await connectDB()

  try {
    await Job.deleteMany()
    console.log('Cleared existing jobs.')

    const createdJobs = await Job.insertMany(jobsData)
    console.log(`Inserted ${createdJobs.length} jobs.`)
  } catch (error) {
    console.error('Seeding failed:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('Connection closed.')
  }
}

seed()