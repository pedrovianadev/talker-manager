const BAD_REQUEST_STATUS = 400;

function emailValidator(req, res, next) {
    const { email } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailModel = regex.test(email);

    if (!email) {
        return res.status(BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!emailModel) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }

    return next();
}

module.exports = emailValidator;
