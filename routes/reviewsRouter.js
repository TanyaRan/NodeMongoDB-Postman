const express = require('express');
const { getReviews, getReview } = require('../controllers/reviewsCtrl');
const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.get(
  '/',
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }),
  getReviews
);

router.get('/:id', getReview);

module.exports = router;
