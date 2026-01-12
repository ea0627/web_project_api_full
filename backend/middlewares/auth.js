const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    // Espera: "Bearer <token>"
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(403).send({ message: 'Acceso prohibido' });
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
        payload = jwt.verify(
            token,
            process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        );
    } catch (err) {
        return res.status(401).send({ message: 'Se requiere autorización' });
    }

    req.user = payload;
    return next();
};