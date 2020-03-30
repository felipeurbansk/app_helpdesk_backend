const connection = require('../database/connection')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateTokenJWT( user_id = {} ) {
    return jwt.sign( { user_id }, authConfig.secret, { expiresIn: 86400 } );
}

module.exports = {

    async index( req, res ) {
        const users = await connection('users')
            .select('*')
            res.json(users);
    },

    async create(req, res) {
        let { name, email, password } = req.body;

        try {

            let user = await connection('users')
                .where('email', '=', email)
                .first();

            if( user ) {
                return res.status(400).json({error: 'E-mail já cadastrado'})
            }

            password = await bcrypt.hash(password, 8);

            const [id] = await connection('users').insert({
                name,
                email,
                password
            });
            
            return res.send( { token: generateTokenJWT(id) } );

        } catch (err) {
            return res.status(400).json({error: "Falha no cadastro"})
        }
    },

    async login( req, res) {
        const { email, password } = req.body;

        const user = await connection('users')
            .where('email', '=', email)
            .first();

        if ( !user ) {
            return res.status(401).send({error: 'E-mail não cadastrado'});
        }

        if( !await bcrypt.compare(password, user.password) ){
            return res.status(401).send({error: "Senha inválida"});
        }
        
        user.password = undefined;
        
        return res.send({
            user,
            token: generateTokenJWT( { id: user.id } )
        });

    },

    async consult( req, res ) {
        
        res.status(200).send({success: "Deu sucesso amigo"})
    }
    

}