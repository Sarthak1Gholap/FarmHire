const { validationResult } = require('express-validator');

// Validation result middleware
const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((err) => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }

    next(); // Proceed if no validation errors
};

module.exports = validationMiddleware;
