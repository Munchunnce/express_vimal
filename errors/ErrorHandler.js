class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.msg = msg;
    };

    static validationError(message = 'All feilds are required!'){
        return new ErrorHandler(422, message);
    };

    static notFoundError(message = 'not found!'){
        return new ErrorHandler(404, message);
    };

    static serverError(message = 'internal Error!'){
        return new ErrorHandler(500, message);
    };

    static forbidden(message = 'Token Error!'){
        return new ErrorHandler(403, message);
    };
};

module.exports = ErrorHandler;

