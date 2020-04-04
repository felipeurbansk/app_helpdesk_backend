
exports.up = function(knex) {
    return knex.schema.createTable('messages', function(table){
      table.increments('id');
      table.string('message');
      table.date('created_at',).defaultTo(knex.fn.now());
      table.date('updated_at').defaultTo(knex.fn.now());
  
      table.integer('ticket_id').notNullable();
  
      table.foreign('ticket_id').references('id').inTable('tickets');
  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('messages');
  };
  