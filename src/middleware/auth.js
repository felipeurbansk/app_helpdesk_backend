const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({error: "Token não foi informado"});
    }

    jwt.verify(authorization, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: "Token inválido"})
    
        req.userId = decoded.id;

        return next();

    })

}