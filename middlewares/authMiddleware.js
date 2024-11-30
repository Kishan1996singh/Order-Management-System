const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');

exports.authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Customer.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};