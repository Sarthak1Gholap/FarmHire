// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || 'An unknown error occurred',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Stack trace only in development
    });
};

module.exports = errorHandler;
