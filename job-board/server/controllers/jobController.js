import Job from '../models/Job.js'

// GET /api/jobs
// Supports optional ?q=keyword and ?location=city query params,
// the same way the frontend search bar already works.
async function getJobs(req, res) {
  try {
    const { q, location } = req.query
    const filter = {}

    if (q && q.trim() !== '') {
      const keyword = q.trim()
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { type: { $regex: keyword, $options: 'i' } },
        { experience: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ]
    }

    if (location && location.trim() !== '') {
      filter.location = { $regex: location.trim(), $options: 'i' }
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 })

   

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message,
    })
  }
}

// GET /api/jobs/:id
async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      })
    }

    res.json({
      success: true,
      data: job,
    })
  } catch (error) {
    // CastError happens when the :id in the URL is not a valid MongoDB id
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid job id',
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message,
    })
  }
}

export { getJobs, getJobById }