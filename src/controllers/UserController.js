const connection = require('../database/connection')


module.exports = {

    async index( req, res ) {
        const users = await connection('users')
            .select('*')
            res.json(users);
    },

    async create(req, res) {
        const { name, email} = req.body;

        const [id] = await connection('users').insert({
            name,
            email
        });

        return res.json({id})
    }

}