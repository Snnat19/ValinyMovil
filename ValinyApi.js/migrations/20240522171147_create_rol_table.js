/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Rol', function(table) {
      table.integer('ID_Rol').primary();
      table.string('Nombre_Rol', 15).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Rol');
  };
  
