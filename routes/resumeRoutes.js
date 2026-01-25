const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { rateResume, downloadReport } = require('../controllers/resumeController');
const { verifyToken } = require('../middleware/auth');

router.post('/rate', verifyToken, upload.single('resume'), rateResume);
router.post('/download', verifyToken, downloadReport);

module.exports = router;