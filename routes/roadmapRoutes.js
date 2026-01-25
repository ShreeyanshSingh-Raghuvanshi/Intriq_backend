const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, roadmapController.getRoadmap);

module.exports = router;