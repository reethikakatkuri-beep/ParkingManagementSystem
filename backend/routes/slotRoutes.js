const router = require('express').Router();
const ctrl = require('../controllers/slotController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, ctrl.create);
router.get('/', protect, ctrl.list);
router.get('/:id', protect, ctrl.get);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
