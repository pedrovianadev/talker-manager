const BAD_REQUEST_STATUS = 400;

function watchedAtValidator(req, res, next) {
    const { watchedAt } = req.body.talk;
    const regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    const date = regex.test(watchedAt);

    if (!watchedAt) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "watchedAt" é obrigatório',
        });
    }

    if (!date) {
        return res.status(BAD_REQUEST_STATUS).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    next();
}

module.exports = watchedAtValidator;