const Administradores = require('../models/Administradores');

module.exports = {
    register(req, res) {
        const administrador = req.body;
        Administradores.create(administrador, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del administrador',
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
        const administradorId = req.params.id; // Obtener el ID del parámetro de la URL
        Administradores.getById(administradorId, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al buscar el administrador',
                    error: err
                });
            }
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontró ningún administrador con ese ID'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Administrador encontrado',
                data: data
            });
        });
    },

    // Añade esta función a tu controlador de administradores
authenticate(req, res) {
    const { ID_Admin, password } = req.body;
    Administradores.authenticate(ID_Admin, password, (err, data) => {
        if (err) {
            return res.status(500).json({               
                success: false,
                message: 'Usuario o contraseña incorrecta',
                error: err
            });
        }
        if (!data) {
            return res.status(401).json({
                success: false,
                message: 'ID_Admin o contraseña incorrectos'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Puedes iniciar sesión',
            data: data
        });
    });
},
    update(req, res) {
        const administradorId = req.params.id; // Obtener el ID del administrador a actualizar
        const newData = req.body; // Obtener los nuevos datos del administrador desde el cuerpo de la solicitud

        Administradores.update(administradorId, newData, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al actualizar el administrador',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Administrador actualizado correctamente',
                data: data
            });
        });
    },

    delete(req, res) {
        const administradorId = req.params.id; // Obtener el ID del administrador a eliminar

        Administradores.delete(administradorId, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al eliminar el administrador',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Administrador eliminado correctamente',
                data: data
            });
        });
    }

}
