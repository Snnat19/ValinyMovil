/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Estudiantes', function(table) {
      table.integer('ID_Estudiante').primary();
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20);
      table.string('T_Nombre', 20);
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20);
      table.integer('Genero').notNullable().references('ID_Genero').inTable('Genero');
      table.integer('T_Documento').notNullable().references('ID_Documento').inTable('T_Documento');
      table.integer('Curso').notNullable().references('ID_Curso').inTable('Cursos');
      table.integer('Administradores').notNullable().references('ID_Admin').inTable('Administradores');
      table.integer('Registro').notNullable().references('ID_Registro').inTable('Registro');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Estudiantes');
  };
  
