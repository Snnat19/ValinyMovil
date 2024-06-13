const supertest = require('supertest');
const app = require('../server'); // Importa tu aplicación Express
const expect = require('chai').expect;

describe('Pruebas de Integración API', function() {
  it('debería crear un estudiante y luego obtenerlo', function(done) {
    // Datos del estudiante a crear
    const newStudent = {
      "ID_Estudiante": 123456789,
      "P_Nombre": "Nombre",
      "S_Nombre": "SegundoNombre",
      "T_Nombre": "TercerNombre",
      "P_Apellido": "Apellido",
      "S_Apellido": "SegundoApellido",
      "Genero": 1,
      "T_Documento": 2,
      "Curso": 22,
      "Administradores": 1022926852,
      "Registro": 1
    };

    // Primero, crea un nuevo estudiante
supertest(app)
.post('/api/estudiantes/create')
.send(newStudent)
.expect(201)
.then((createResponse) => {
  // Luego, obtén el estudiante que acabas de crear
  return supertest(app)
    .get(`/api/estudiantes/${newStudent.ID_Estudiante}`)
    .expect(200)
    .then((getResponse) => ({ createResponse, getResponse })); // Devuelve ambos objetos
})
.catch((err) => done(err));

  });
});

describe('Pruebas de Integración API', function() {
  it('debería crear un Administrador y luego obtenerlo', function(done) {
    // Datos del estudiante a crear
    const newAdmin = {
      "ID_Admin": 123456789,
      "Rol": 1,
      "Clave": 5,
      "T_Documento": 1,
      "P_Nombre": "Nombre",
      "S_Nombre": "SegundoNombre",
      "T_Nombre": "TercerNombre",
      "P_Apellido": "Apellido",
      "S_Apellido": "SegundoApellido",
      "Genero": 1
    };

    // Primero, crea un nuevo estudiante
supertest(app)
.post('/api/administradores/create')
.send(newAdmin)
.expect(201)
.then((createResponse) => {
  // Luego, obtén el estudiante que acabas de crear
  return supertest(app)
    .get(`/api/administradores/${newAdmin.ID_Admin}`)
    .expect(200)
    .then((getResponse) => ({ createResponse, getResponse })); // Devuelve ambos objetos
})
.catch((err) => done(err));

  });
});
