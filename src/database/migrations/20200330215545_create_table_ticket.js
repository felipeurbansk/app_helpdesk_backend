
exports.up = function(knex) {
  return knex.schema.createTable('tickets', function(table){
    table.increments('id');
    table.string('subject');
    table.string('description');
    table.date('created_at',).defaultTo(knex.fn.now());
    table.date('updated_at').defaultTo(knex.fn.now());

    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tickets');
};
