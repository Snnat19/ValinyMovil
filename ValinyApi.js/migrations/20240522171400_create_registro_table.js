/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Registro', function(table) {
      table.integer('ID_Registro').primary();
      table.string('Nom_Registro', 20).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Registro');
  };
  
