const express = require('express');
const router = express.Router();

const { getAllStudents, getSingleStudents, CreateStudents, getUpdateStudents, getDelteStudents} = require('../controllers/students.controllers')



router.route('/').get(getAllStudents).post(CreateStudents);
router.route('/:id').get(getSingleStudents).put(getUpdateStudents).delete(getDelteStudents);
router.route('/:username').patch(getUpdateStudents)



module.exports = router;