const connection = require('../database/connection');


module.exports = {

    async index(req, res) {
        const { ticket_id } = req.body;

        if ( !ticket_id ) return res.status(401).json({error: 'ticket_id não foi informado'});

        const response = await connection('message')
            .where('ticket_id', '=', ticket_id);

        return res.send(response);

    },

    async create(req, res) {

        const { message, ticket_id } = req.body;
        const user_id = req.headers.user_id;

        if ( !user_id ) return res.status(403).json({error: 'user_id não foi informado.'});

        if ( !ticket_id ) return res.status(403).json({error: 'ticket_id não foi informado.'});

        if ( !message ) return res.status(401).json({error: 'Nenhuma menssagem informado.'});

        const ticket = await connection('tickets')
            .where({
                id: ticket_id,
                user_id: user_id
            })
            .first();

        console.log(ticket);

        if ( !ticket ) return res.status(403).json({error: "Sem permissão para alterar esse ticket"});

        const response = await connection('message').insert({
            message,
            ticket_id
        });

        return res.send(response);

    }

}