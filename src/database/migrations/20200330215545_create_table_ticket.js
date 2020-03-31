
exports.up = function(knex) {
  return knex.schema.createTable('tickets', function(table){
    table.increments('id');
    table.string('subject');
    table.string('description');
    table.date('created_at',).defaultTo(knex.fn.now());
    table.date('updated_at').defaultTo(knex.fn.now());;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tickets');
};
