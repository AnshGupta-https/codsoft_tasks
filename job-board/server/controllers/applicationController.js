import Application from '../models/Application.js'
import Job from '../models/Job.js'

// POST /api/applications (protected, candidates only)
async function applyToJob(req, res) {
  try {
    if (req.user.role !== 'candidate') {
      return res.status(403).json({
        success: false,
        message: 'Only candidate accounts can apply to jobs',
      })
    }

    const { jobId, coverLetter } = req.body

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'jobId is required',
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'A resume file is required',
      })
    }

    const job = await Job.findById(jobId)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      })
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      coverLetter: coverLetter || '',
      resumePath: `/uploads/resumes/${req.file.filename}`,
      resumeOriginalName: req.file.originalname,
    })

    res.status(201).json({
      success: true,
      data: application,
    })
  } catch (error) {
    // 11000 is MongoDB's duplicate key error, triggered by the unique
    // (job, applicant) index when someone applies to the same job twice
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this job',
      })
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid job id',
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message,
    })
  }
}

// GET /api/applications/me (protected)
async function getMyApplications(req, res) {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location type')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    })
  }
}

export { applyToJob, getMyApplications }