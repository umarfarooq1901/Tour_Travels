const messageHandler = (res, statusCode, page, message) => {
    return res.status(statusCode).render(page, { message });
};

module.exports = messageHandler;
