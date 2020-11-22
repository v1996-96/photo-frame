const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(400).json({ error: { message: error.message } });
    next(error);
};

module.exports = errorHandler;
