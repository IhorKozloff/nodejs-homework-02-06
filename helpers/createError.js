const messages = {
    400: "Bad Request",
    401: "Not Authorization",
    403: "Forbidden",
    404: "Not Found",
    409: "conflict",
};


const createError = (status, message = messages[status]) => {

    const error = new Error(message);
    error.status = status;
    return error;
}
module.exports = createError;