
exports.up = function(knex) {
  knex.schema.createTable('tickets', function(table){
    table.increments('id');
    table.string('subject');
    table.string('description');
    table.string('created_at');
    table.string('update_at');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('tickets');
};
