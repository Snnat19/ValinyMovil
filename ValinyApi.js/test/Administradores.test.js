// Importa las bibliotecas necesarias
const supertest = require('supertest');
const app = require('../server'); // Importa tu aplicación Express
const expect = require('chai').expect;

describe('API Tests', function() {
    it('debería devolver un administracion específico', function(done) {
      // Usa un ID de estudiante válido para esta prueba
      const adminId = '1022926852';
  
      supertest(app)
        .get(`/api/administradores/${adminId}`)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an('object');
          // Convierte el Documento a cadena de texto antes de hacer la comparación
          expect(res.body.data.Documento.toString()).to.equal(adminId);
          done();
        });
    });
  });

  describe('API Tests', function() {
    it('debería auntenticar a un administrador', function(done) {
      // Datos del estudiante a crear
      const Admin = {
        "ID_Admin": "1022926852",
        "password": "1022926852"
      };
  
      supertest(app)
        .post('/api/administradores/authenticate')
        .send(Admin) // Envía los datos del estudiante en el cuerpo de la solicitud
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
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
    it('debería crear un nuevo Administrador', function(done) {
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
  
      supertest(app)
        .post('/api/administradores/create')
        .send(newAdmin) // Envía los datos del estudiante en el cuerpo de la solicitud
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
    it('debería actualizar un Administrador específico', function(done) {
      // Usa un ID de estudiante válido para esta prueba
      const adminId = '123456789';
      
      const newData = {
        "Rol": 2
      };
  
      supertest(app)
        .put(`/api/administradores/${adminId}`)
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
    it('debería eliminar un administrador específico', function(done) {
      // Usa un ID de estudiante válido para esta prueba
      const adminId = '123456789';
      
  
      supertest(app)
        .delete(`/api/administradores/${adminId}`)
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