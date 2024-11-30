const rateLimit = require('express-rate-limit');

exports.apiRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { message: 'Too many requests, please try again later.' },
});
