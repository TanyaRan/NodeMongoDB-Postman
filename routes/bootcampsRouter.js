const express = require('express');
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamps
} = require('../controllers/bootcampsCtrl');

router.get('/', getBootcamps);
router.post('/', createBootcamp);

router.get('/:id', getBootcamp);
router.put('/:id', updateBootcamp);
router.delete('/:id', deleteBootcamps);

module.exports = router;
