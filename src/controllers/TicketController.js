const connection = require('../database/connection');


module.exports = {

    async index(req, res) {
        const tickets = await connection('tickets').select('*');

        console.log(tickets)

    },

    create(req, res) {
        const {subject, description} = req.body;

        console.log(subject, description)
    }

}