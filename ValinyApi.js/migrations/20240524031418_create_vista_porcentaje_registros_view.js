/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.raw(`
      CREATE VIEW vista_porcentaje_registros AS
      SELECT 
          COUNT((CASE
              WHEN (registro.Nom_Registro = 'Asiste') THEN 1
          END)) AS Asistencia,
          ((COUNT((CASE
              WHEN (registro.Nom_Registro = 'Asiste') THEN 1
          END)) / COUNT(*)) * 100) AS Porcentaje_Asistencia,
          COUNT((CASE
              WHEN (registro.Nom_Registro = 'Falla') THEN 1
          END)) AS Falla,
          ((COUNT((CASE
              WHEN (registro.Nom_Registro = 'Falla') THEN 1
          END)) / COUNT(*)) * 100) AS Porcentaje_Falla,
          COUNT((CASE
              WHEN (registro.Nom_Registro = 'Retardo') THEN 1
          END)) AS Retardo,
          ((COUNT((CASE
              WHEN (registro.Nom_Registro = 'Retardo') THEN 1
          END)) / COUNT(*)) * 100) AS Porcentaje_Retardo,
          COUNT((CASE
              WHEN (registro.Nom_Registro = 'Evasion') THEN 1
          END)) AS Evasion,
          ((COUNT((CASE
              WHEN (registro.Nom_Registro = 'Evasion') THEN 1
          END)) / COUNT(*)) * 100) AS Porcentaje_Evasion,
          COUNT((CASE
              WHEN (registro.Nom_Registro = 'Justificada') THEN 1
          END)) AS Falla_Justificada,
          ((COUNT((CASE
              WHEN (registro.Nom_Registro = 'Falla Justificada') THEN 1
          END)) / COUNT(*)) * 100) AS Porcentaje_Falla_Justificada
      FROM
          estudiantes
          JOIN registro ON (estudiantes.Registro = registro.ID_Registro)
    `);
  };
  
  exports.down = function(knex) {
    return knex.raw('DROP VIEW vista_porcentaje_registros');
  };
  
