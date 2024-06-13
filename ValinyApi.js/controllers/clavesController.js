const Clave = require('../models/Clave');

module.exports = {

    registerClave(req, res) {
        const clave = req.body;
        Clave.create(clave, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la clave',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El registro de la clave se realizó correctamente',
                data: data
            });
        });
    }

}