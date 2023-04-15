const BAD_REQUEST_STATUS = 400;

function ageValidator(req, res, next) {
    const { age } = req.body;

    if (!age) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "age" é obrigatório',
        });
    }

    if (age < 18 || !Number.isInteger(age) || typeof age !== 'number') {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }

    return next();
}

module.exports = ageValidator;
