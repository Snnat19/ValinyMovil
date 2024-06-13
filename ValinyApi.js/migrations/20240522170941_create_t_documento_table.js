/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('T_Documento', function(table) {
      table.integer('ID_Documento').primary();
      table.string('Tipo_Documento', 50).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('T_Documento');
  };
  