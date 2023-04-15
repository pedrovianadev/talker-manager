const BAD_REQUEST_STATUS = 400;

function talkValidator(req, res, next) {
    const { talk } = req.body;

    if (!talk) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "talk" é obrigatório',
        });
    }

    next();
}

module.exports = talkValidator;
