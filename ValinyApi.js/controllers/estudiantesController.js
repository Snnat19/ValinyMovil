    const Estudiantes = require('../models/Estudiantes');

    module.exports = {
        register(req, res) {
            const estudiantes = req.body;
            Estudiantes.create(estudiantes, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuario',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizó correctamente',
                    data: data
                });
            });
        },

        getById(req, res) {
            const estudianteId = req.params.id; // Obtener el ID del parámetro de la URL
            Estudiantes.getById(estudianteId, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Hubo un error al buscar el estudiante',
                        error: err
                    });
                }
                if (!data) {
                    return res.status(404).json({
                        success: false,
                        message: 'No se encontró ningún estudiante con ese ID'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Estudiante encontrado',
                    data: data
                });
            });
        },

        getAll(req, res) {
            Estudiantes.getAll((err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Hubo un error al buscar los estudiantes',
                        error: err
                    });
                }
                if (!data) {
                    return res.status(404).json({
                        success: false,
                        message: 'No se encontraron estudiantes'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Estudiantes encontrados',
                    data: data
                });
            });
        },    
    
        update(req, res) {
            const estudianteId = req.params.id; // Obtener el ID del estudiante a actualizar
            const newData = req.body; // Obtener los nuevos datos del estudiante desde el cuerpo de la solicitud

            Estudiantes.update(estudianteId, newData, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Hubo un error al actualizar el estudiante',
                        error: err
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Estudiante actualizado correctamente',
                    data: data
                });
            });
        },

            getPorcentajeRegistros(req, res) {
                Estudiantes.getPorcentajeRegistros((err, data) => {
                    if (err) {
                        console.error(err); // Imprimir el error completo
                        return res.status(500).json({
                            success: false,
                            message: 'Hubo un error al buscar los registros',
                            error: err
                        });
                    }
                    if (!data) {
                        return res.status(404).json({
                            success: false,
                            message: 'No se encontraron registros'
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Registros encontrados',
                        data: data
                    });
                });
            },
        
        

        delete(req, res) {
            const estudianteId = req.params.id; // Obtener el ID del estudiante a eliminar

            Estudiantes.delete(estudianteId, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Hubo un error al eliminar el estudiante',
                        error: err
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Estudiante eliminado correctamente',
                    data: data
                });
            });
        }

    }
