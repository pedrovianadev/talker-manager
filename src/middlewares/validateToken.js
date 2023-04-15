const UNAUTHORIZED_STATUS = 401;

function tokenValidator(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(UNAUTHORIZED_STATUS).json({
            message: 'Token não encontrado',
        });
    } if (token.length !== 16) {
        return res.status(UNAUTHORIZED_STATUS).json({
            message: 'Token inválido',
        });
    }

    next();
}

module.exports = tokenValidator;
