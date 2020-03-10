const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../.env');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        res.locals.token = jwt.verify(token, jwtSecret);
        next();
    } catch (error) {
        return res.status(403).json({err: "Sua sessão foi invalidada ou expirada! " });
    }
}