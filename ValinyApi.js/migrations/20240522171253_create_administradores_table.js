/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Administradores', function(table) {
      table.integer('ID_Admin').primary();
      table.integer('Rol').notNullable().references('ID_Rol').inTable('Rol');
      table.integer('Clave').unsigned().notNullable().references('ID_Clave').inTable('Clave');
      table.integer('T_Documento').notNullable().references('ID_Documento').inTable('T_Documento');
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20);
      table.string('T_Nombre', 20);
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20);
      table.integer('Genero').notNullable().references('ID_Genero').inTable('Genero');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Administradores');
  };
  
