const express = require('express');
const { register, login } = require('../controllers/customerController');
const { apiRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/register', apiRateLimiter, register);
router.post('/login', apiRateLimiter, login);

module.exports = router;
