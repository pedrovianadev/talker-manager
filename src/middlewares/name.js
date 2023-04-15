const BAD_REQUEST_STATUS = 400;

function nameValidator(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "name" é obrigatório',
        });
    }

    if (name.length < 3) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }

    next();
}

module.exports = nameValidator;