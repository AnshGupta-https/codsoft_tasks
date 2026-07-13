import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Job type is required'],
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
      default: '',
    },
    experience: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    // Not required: the seed data has no real employer behind it, and that's fine.
    // Every job created through the real POST /api/jobs endpoint will have this set.
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  // timestamps adds createdAt / updatedAt automatically, so we always know
  // exactly when a job was posted without storing a fixed "2 days ago" string
  { timestamps: true },
)

const Job = mongoose.model('Job', jobSchema)

export default Job