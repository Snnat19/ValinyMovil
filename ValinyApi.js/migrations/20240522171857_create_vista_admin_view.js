/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.raw(`
    CREATE VIEW Vista_Admin AS
    SELECT 
      A.ID_Admin AS 'Documento',
      R.Nombre_Rol AS 'Rol',
      C.Contrasenia AS 'Contraseña',
      T.Tipo_Documento AS 'Tipo_de_documento',
      CONCAT(P_Nombre, ' ', COALESCE(S_Nombre, ''), ' ', COALESCE(T_Nombre, ''), ' ', P_Apellido, ' ', COALESCE(S_Apellido, '')) AS 'Nombres',
      G.Nom_Genero AS 'Genero' 
    FROM Administradores A 
    INNER JOIN Rol R ON R.ID_Rol = A.Rol 
    INNER JOIN Clave C ON C.ID_Clave = A.Clave 
    INNER JOIN T_Documento T ON T.ID_Documento = A.T_Documento 
    INNER JOIN Genero G ON G.ID_Genero = A.Genero;

    `);
  };
  
  exports.down = function(knex) {
    return knex.raw('DROP VIEW Vista_Admin;');
  };
  
