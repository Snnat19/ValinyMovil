const db = require('../config/config');


const Estudiantes = {};
Estudiantes.create = async (estudiantes, result) => {
    const sql =
        `INSERT INTO Estudiantes (
            ID_Estudiante,
            P_Nombre, 
            S_Nombre, 
            T_Nombre, 
            P_Apellido, 
            S_Apellido, 
            Genero, 
            T_Documento, 
            Curso, 
            Administradores, 
            Registro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql,
        [
            estudiantes.ID_Estudiante,
            estudiantes.P_Nombre,
            estudiantes.S_Nombre,
            estudiantes.T_Nombre,
            estudiantes.P_Apellido,
            estudiantes.S_Apellido,
            estudiantes.Genero,
            estudiantes.T_Documento,
            estudiantes.Curso,
            estudiantes.Administradores,
            estudiantes.Registro,
        ], (err, res) => {
            if (err) {
                console.log('Error al crear el usuario: ', err);
                result(err, null);
            }
            else {
                console.log('Usuario creado: ');
                result(null, res); // Aquí se llama a la función result
            }
        }
    )};

        
        Estudiantes.getById = (id, result) => {
            const sql = 'SELECT * FROM Vista_Estu WHERE Documento = ?'; // Utilizamos la vista Vista_Estu en lugar de la tabla Estudiantes
            db.query(sql, [id], (err, res) => {
                if (err) {
                    console.log('Error al buscar el estudiante: ', err);
                    result(err, null);
                    return;
                }
                if (res.length) {
                    console.log('Estudiante encontrado: ', res[0]);
                    result(null, res[0]);
                    return;
                }
                // Si no se encuentra ningún estudiante con ese ID
                result({ message: 'Estudiante no encontrado' }, null);
            });
        };
        Estudiantes.getAll = (result) => {
            const sql = 'SELECT * FROM cfgo_ied.vista_estu'; // Utilizamos la vista Vista_Estu en lugar de la tabla Estudiantes
            db.query(sql, (err, res) => {
                if (err) {
                    console.log('Error al buscar los estudiantes: ', err);
                    result(err, null);
                    return;
                }
                if (res.length) {
                    console.log('Estudiantes encontrados: ', res);
                    result(null, res);
                    return;
                }
                // Si no se encuentra ningún estudiante
                result({ message: 'No se encontraron estudiantes' }, null);
            });
        };
        Estudiantes.getPorcentajeRegistros = (result) => {
            const sql = 'SELECT * FROM cfgo_ied.vista_porcentaje_registros'; // Utilizamos la vista vista_porcentaje_registros
            db.query(sql, (err, res) => {
                if (err) {
                    console.log('Error al buscar los registros: ', err);
                    result(err, null);
                    return;
                }
                if (res.length) {
                    console.log('Registros encontrados: ', res);
                    result(null, res);
                    return;
                }
                // Si no se encuentra ningún registro
                result({ message: 'No se encontraron registros' }, null);
            });
        };
        

        Estudiantes.update = (id, newData, result) => {
            const sql = 'UPDATE Estudiantes SET ? WHERE ID_Estudiante = ?';
            db.query(sql, [newData, id], (err, res) => {
                if (err) {
                    console.log('Error al actualizar el estudiante: ', err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    // No se encontró ningún estudiante con ese ID
                    result({ message: 'No se encontró ningún estudiante con ese ID' }, null);
                    return;
                }
                console.log('Estudiante actualizado correctamente');
                result(null, newData);
            });
        };
        
Estudiantes.delete = (id, result) => {
    const sql = 'DELETE FROM Estudiantes WHERE ID_Estudiante = ?';
    db.query(sql, [id], (err, res) => {
        if (err) {
            console.log('Error al eliminar el estudiante: ', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // No se encontró ningún estudiante con ese ID
            result({ message: 'No se encontró ningún estudiante con ese ID' }, null);
            return;
        }
        console.log('Estudiante eliminado correctamente');
        result(null, res);
    });
};

module.exports = Estudiantes;