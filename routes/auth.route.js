const express = require('express');

const controllers = require('../controllers/auth.controller');

const router = express.Router();

router.get('/login', controllers.get);
router.post('/login', controllers.postLogin);

module.exports = router;