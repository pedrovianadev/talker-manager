const BAD_REQUEST_STATUS = 400;

function passValidator(req, res, next) {
    const { password } = req.body;

    if (!password) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "password" é obrigatório',
        });
    }

    if (password.length < 6) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }

    next();
}

module.exports = passValidator;
