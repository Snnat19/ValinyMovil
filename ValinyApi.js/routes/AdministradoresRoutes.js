const administradoresController = require('../controllers/administradoresController');

module.exports = (app) => { 
    app.post('/api/administradores/create', administradoresController.register);
    app.get('/api/administradores/:id', administradoresController.getById);
    app.put('/api/administradores/:id', administradoresController.update);
    app.delete('/api/administradores/:id', administradoresController.delete); // Nueva ruta para eliminar un administrador por su ID
    app.post('/api/administradores/authenticate', administradoresController.authenticate);

}
