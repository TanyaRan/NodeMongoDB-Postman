const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/coursesCtrl');
const Course = require('../models/Course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.get(
  '/',
  advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
  }),
  getCourses
);
router.post('/', protect, authorize('publisher', 'admin'), addCourse);

router.get('/:id', getCourse);
router.put('/:id', protect, authorize('publisher', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
