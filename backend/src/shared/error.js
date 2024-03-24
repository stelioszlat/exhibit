
exports.throwError = (message, errorCode, errors=[]) => {
    const error = new Error(message);
    error.statusCode = errorCode;
    error.data = errors
    throw error;
}

exports.errorHandler = (error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({message: message});
}