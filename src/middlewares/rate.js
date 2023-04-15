const BAD_REQUEST_STATUS = 400;

function rateValidator(req, res, next) {
    const { rate } = req.body.talk;

    if (!rate && rate !== 0) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "rate" é obrigatório',
        });
    }

    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }

    next();
}

module.exports = rateValidator;