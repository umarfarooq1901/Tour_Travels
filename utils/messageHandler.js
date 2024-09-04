const messageHandler = (res, statusCode, page, message) => {
    return res.status(statusCode).render(page, { message });
};

module.exports = messageHandler;




// const messageHandler = (res, statusCode, page, message, data = {}) => {
//     return res.status(statusCode).render(page, { message, ...data });
// };

// module.exports = messageHandler;
