const router = require('express').Router();
const ctrl = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkin', protect, ctrl.checkin);
router.post('/:id/checkout', protect, ctrl.checkout);
router.post('/:id/pay', protect, ctrl.pay); 
router.get('/', protect, ctrl.list);
router.get('/:id', protect, ctrl.get);

module.exports = router;
