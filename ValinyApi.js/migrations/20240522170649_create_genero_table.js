/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Genero', function(table) {
      table.integer('ID_Genero').primary();
      table.string('Nom_Genero', 15).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Genero');
  };
  