import express from 'express'
import { applyToJob, getMyApplications } from '../controllers/applicationController.js'
import { protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

function handleResumeUpload(req, res, next) {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }
    next()
  })
}

router.post('/', protect, handleResumeUpload, applyToJob)
router.get('/me', protect, getMyApplications)

export default router