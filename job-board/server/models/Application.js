import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      default: '',
    },
    resumePath: {
      type: String,
      required: [true, 'Resume file is required'],
    },
    resumeOriginalName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true },
)

// A candidate can only apply to the same job once
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true })

const Application = mongoose.model('Application', applicationSchema)

export default Application