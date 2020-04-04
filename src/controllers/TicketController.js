const connection = require('../database/connection');
const format = require('date-format');


module.exports = {

    async index(req, res) {
        const {user_id, ticket_id} = req.headers;

        if ( !user_id ) return res.status(403).json({error: "user_id não enviado."});

        const tickets = await connection('tickets')
                .join('users', 'users.id', '=', 'tickets.user_id')
                .where('users.id', '=', user_id)
                .select(['tickets.*', 'users.name', 'users.email']);
        console.log(tickets)
        return res.send(tickets)

    },

    async create(req, res) {
        const {subject, description} = req.body;
        const user_id = req.headers.user_id

        if ( !user_id ) return res.status(401).json({error: "user_id não enviado"});
        if ( !subject ) return res.status(401).json({error: "Assunto não foi informado"});
        if ( !description ) return res.status(401).json({error: "Descrição não foi informado"});

        const [id] = await connection('tickets')
            .insert({subject, description, user_id});
        
        return res.send({id});
        
    },

    async update(req, res) {
        const {id, subject, description} = req.body;
        const updated_at = format('yyyy-MM-dd hh:mm:ss', new Date());
        
        const response = await connection('tickets')
            .where('id', '=', id)
            .update({id, subject, description, updated_at});


        return res.status(200).json({success: response})
    },

    async delete(req, res){

        const {id} = req.body;

        if (!id) {
            return res.status(400).json({error: "Parâmetro id não encontrado."})
        }
        try {

            const response = await connection('tickets')
                .where('id', '=', id)
                .delete();
            
            if ( response ){
                return res.status(200).json({success: `Ticket ${id} excluido com sucesso.`});
            } else {
                return res.status(401).json({error: `Ticket ${id} já foi excluido ou não existe.`});
            }
            
        
        } catch(err) {
            return res.status(400).json({error: err.message});
        }
    }

}