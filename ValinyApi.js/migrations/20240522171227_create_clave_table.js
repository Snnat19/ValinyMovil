/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Clave', function(table) {
      table.increments('ID_Clave').primary();
      table.string('Contrasenia', 500).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Clave');
  };
  
