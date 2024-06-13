// Importa las bibliotecas necesarias
const supertest = require('supertest');
const app = require('../server'); // Importa tu aplicación Express
const expect = require('chai').expect;

// Crea tu suite de pruebas con Mocha
describe('API Tests', function() {
  it('debería devolver todos los estudiantes', function(done) {
    // Usa Supertest para hacer una solicitud HTTP a tu API
    supertest(app)
      .get('/api/estudiantes')
      .end(function(err, res) {
        // Asegúrate de que la respuesta tenga el estado HTTP correcto y el formato de respuesta esperado
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});

describe('API Tests', function() {
  it('debería devolver todos los porcentajes', function(done) {
    // Usa Supertest para hacer una solicitud HTTP a tu API
    supertest(app)
      .get('/api/porcentajes/porcentaje_registros')
      .end(function(err, res) {
        // Asegúrate de que la respuesta tenga el estado HTTP correcto y el formato de respuesta esperado
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});

describe('API Tests', function() {
  it('debería devolver un estudiante específico', function(done) {
    // Usa un ID de estudiante válido para esta prueba
    const studentId = '1023002065';

    supertest(app)
      .get(`/api/estudiantes/${studentId}`)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.an('object');
        // Convierte el Documento a cadena de texto antes de hacer la comparación
        expect(res.body.data.Documento.toString()).to.equal(studentId);
        done();
      });
  });
});

describe('API Tests', function() {
  it('debería crear un nuevo estudiante', function(done) {
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

    supertest(app)
      .post('/api/estudiantes/create')
      .send(newStudent) // Envía los datos del estudiante en el cuerpo de la solicitud
      .end(function(err, res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
       /* if (res.body.data && typeof res.body.data === 'object') {
          expect(res.body.data.ID_Estudiante.toString()).to.equal(newStudent.ID_Estudiante.toString());
        } */
        done();
      });
  });
});

describe('API Tests', function() {
  it('debería actualizar un estudiante específico', function(done) {
    // Usa un ID de estudiante válido para esta prueba
    const studentId = '123456789';
    
    const newData = {
      "Registro": 0
    };

    supertest(app)
      .put(`/api/estudiantes/${studentId}`)
      .send(newData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.an('object');
        // Convierte el Documento a cadena de texto antes de hacer la comparación
        done();
      });
  });
});

describe('API Tests', function() {
  it('debería eliminar un estudiante específico', function(done) {
    // Usa un ID de estudiante válido para esta prueba
    const studentId = '123456789';
    

    supertest(app)
      .delete(`/api/estudiantes/${studentId}`)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.an('object');
        // Convierte el Documento a cadena de texto antes de hacer la comparación
        done();
      });
  });
});