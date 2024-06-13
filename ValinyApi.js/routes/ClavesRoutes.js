const clavesController = require("../controllers/clavesController");


module.exports = (app) => { 

    app.post('/api/clave/create', clavesController.registerClave);

}
