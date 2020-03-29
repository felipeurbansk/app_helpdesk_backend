const connection = require('../database/connection')
const bcrypt = require("bcryptjs");

module.exports = {

    async index( req, res ) {
        const users = await connection('users')
            .select('*')
            res.json(users);
    },

    async create(req, res) {
        let { name, email, password } = req.body;

        try {

            const user_bd = await connection('users')
                .where('email', '=', email)
                .first();

            if( user_bd ) {
                return res.status(400).json({error: 'E-mail já cadastrado'})
            }

            password = await bcrypt.hash(password, 8);

            console.log('entrou')
            console.log(password)

            const [id] = await connection('users').insert({
                name,
                email,
                password
            });

            return res.json({id})

        } catch (err) {
            console.log(err)
            return res.status(400).json({error: "Falha no cadastro"})
        }
    },

    async login( req, res) {
        const { email, password } = req.body;

        const user_bd = await connection('users')
            .where('email', '=', email)
            .first();
        
        if ( !user_bd ) {
            return res.status(403).json({error: 'E-mail não cadastrado'});
        }

        console.log(user_bd.password, password, await bcrypt.hash(password, 8))

        console.log( await bcrypt.compare(user_bd.password, password))
        
        return res.status(400).json({error:'Chegou ao fim da linha'})

    }

}