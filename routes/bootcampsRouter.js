const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcampsCtrl');
const Bootcamp = require('../models/Bootcamp');
// Include other resource router
const coursesRouter = require('./coursesRouter');
const reviewsRouter = require('./reviewsRouter');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', coursesRouter);
router.use('/:bootcampId/reviews', reviewsRouter);

router.get('/radius/:zipcode/:distance', getBootcampsInRadius);

router.put(
  '/:id/photo',
  protect,
  authorize('publisher', 'admin'),
  bootcampPhotoUpload
);

router.get('/', advancedResults(Bootcamp, 'courses'), getBootcamps);
router.post('/', protect, authorize('publisher', 'admin'), createBootcamp);

router.get('/:id', getBootcamp);
router.put('/:id', protect, authorize('publisher', 'admin'), updateBootcamp);
router.delete('/:id', protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
