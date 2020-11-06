const express = require('express');

const { body } = require('express-validator');

const HomeController = require('../controllers/home');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, HomeController.fetchAll);

module.exports = router;
