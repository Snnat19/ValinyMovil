/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 exports.up = function(knex) {
    return knex.raw(`
      CREATE VIEW Vista_Estu AS
      SELECT 
        E.ID_Estudiante AS 'Documento',
        CONCAT(E.P_Nombre, ' ', COALESCE(E.S_Nombre, ''), ' ', COALESCE(E.T_Nombre, ''), ' ', E.P_Apellido, ' ', E.S_Apellido) AS 'Nombres',
        G.Nom_Genero AS 'Genero',
        T.Tipo_Documento AS 'Tipo_de_documento',
        C.Num_Curso AS 'Curso',
        CONCAT(A.P_Nombre, ' ', A.P_Apellido) AS 'Administradores',
        R.Nom_Registro AS 'Registro'
      FROM Estudiantes E 
      INNER JOIN Genero G ON G.ID_Genero = E.Genero
      INNER JOIN T_Documento T ON T.ID_Documento = E.T_Documento
      INNER JOIN Cursos C ON C.ID_Curso = E.Curso
      INNER JOIN Administradores A ON A.ID_Admin = E.Administradores
      INNER JOIN Registro R ON R.ID_Registro = E.Registro;
    `);
  };
  
  exports.down = function(knex) {
    return knex.raw('DROP VIEW Vista_Estu;');
  };
  
