const estudiantesController = require('../controllers/estudiantesController');

module.exports = (app) => { 
    app.post('/api/estudiantes/create', estudiantesController.register);
    app.get('/api/estudiantes/:id', estudiantesController.getById);
    app.put('/api/estudiantes/:id', estudiantesController.update);
    app.delete('/api/estudiantes/:id', estudiantesController.delete); // Nueva ruta para eliminar un estudiante por su ID
   app.get('/api/estudiantes', estudiantesController.getAll);
   app.get('/api/porcentajes/porcentaje_registros', estudiantesController.getPorcentajeRegistros);

}
