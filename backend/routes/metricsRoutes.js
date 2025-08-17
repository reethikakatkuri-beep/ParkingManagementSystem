const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const metrics = require('../controllers/metricsController');

router.get('/overview', protect, metrics.overview);

module.exports = router;
