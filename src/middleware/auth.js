const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {

    const user_token = req.headers.user_token;

    if (!user_token) {
        return res.status(401).json({error: "Token não foi informado"});
    }

    jwt.verify(user_token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: "Token inválido"})
    
        req.userId = decoded.id;

        return next();

    })

}