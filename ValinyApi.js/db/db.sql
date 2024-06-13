CREATE DATABASE cfgo_ied; 
USE cfgo_ied;

CREATE TABLE  Genero (
  ID_Genero INT NOT NULL,
  Nom_Genero VARCHAR(15) NOT NULL,
  PRIMARY KEY (ID_Genero)
);

SET SQL_SAFE_UPDATES = 0;

DELETE FROM Genero;

SET SQL_SAFE_UPDATES = 1;


INSERT INTO Genero (ID_Genero, Nom_Genero)
VALUES (1, 'Masculino'), (2, 'Femenino');

CREATE TABLE  T_Documento (
  ID_Documento INT NOT NULL,
  Tipo_Documento VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID_Documento)
);

INSERT INTO T_Documento (ID_Documento, Tipo_Documento) 
VALUES 
(1, 'Cédula de Ciudadanía'),
(2, 'Tarjeta de Identidad'),
(3, 'Cédula de Extranjería'),
(4, 'Registro Civil de Nacimiento');

CREATE TABLE  Rol (
  ID_Rol INT NOT NULL, 
  Nombre_Rol VARCHAR(15) NOT NULL,
  PRIMARY KEY (ID_Rol)
);

INSERT INTO Rol (ID_Rol, Nombre_Rol)
VALUES (1,'Directivo'), (2, 'Orientador'), (3, 'Docente');

CREATE TABLE  Clave (
  ID_Clave INT NOT NULL AUTO_INCREMENT,
  Contrasenia VARCHAR(500) NOT NULL,
  PRIMARY KEY (ID_Clave)
);

INSERT INTO Clave (Contrasenia)
VALUES 
(HEX(aes_encrypt('1022923336','HJCJ75'))),
(HEX(aes_encrypt('1140914036','HJCJ75'))),
(HEX(aes_encrypt('1022926852','HJCJ75'))),
(HEX(aes_encrypt('1000695329','HJCJ75'))),
(HEX(aes_encrypt('1234567890','HJCJ75')));

CREATE TABLE  Administradores (
  ID_Admin INT NOT NULL,
  Rol INT NOT NULL,
  Clave INT NOT NULL,
  T_Documento INT NOT NULL,
  P_Nombre VARCHAR(20) NOT NULL,
  S_Nombre VARCHAR(20),
  T_Nombre VARCHAR(20),
  P_Apellido VARCHAR(20) NOT NULL,
  S_Apellido VARCHAR(20),
  Genero INT NOT NULL,
  PRIMARY KEY (ID_Admin),
  FOREIGN KEY (Clave) REFERENCES Clave(ID_Clave),
  FOREIGN KEY (Genero) REFERENCES Genero(ID_Genero),
  FOREIGN KEY (Rol) REFERENCES Rol(ID_Rol),
  FOREIGN KEY (T_Documento) REFERENCES T_Documento(ID_Documento)
);

INSERT INTO Administradores (ID_Admin, Rol, Clave, T_Documento, P_Nombre, S_Nombre, T_Nombre, P_Apellido, S_Apellido, Genero)
VALUES
(1022923336, 3, 1, 1, 'Cristian', 'David', NULL, 'Lombana', 'Bernate', 1), 
(1140914036, 1, 2, 1, 'Heidy', 'Jireth', NULL, 'Prieto', 'García', 2),
(1022926852, 2, 3, 1, 'Jean', 'Pierre', 'Daniel', 'Nieto', 'Gaona', 1),
(1000695329, 3, 4, 1, 'Jhon', 'Andrey', NULL, 'Luna', 'Moreno', 1);

CREATE TABLE  Cursos (
  ID_Curso INT NOT NULL, 
  Num_Curso VARCHAR(4) NOT NULL,
  PRIMARY KEY (ID_Curso)
);

INSERT INTO Cursos (ID_Curso, Num_Curso)
VALUES
(1,'PJ01'), (2,'J01'), (3,'J02'), (4,'J03'), (5,'T01'), (6,'T02'), (7,'T03'),
(8,'101'), (9,'102'), (10,'103'), (11,'201'), (12,'202'), (13,'203'),
(14,'301'), (15,'302'), (16,'303'), (17,'401'), (18,'402'), (19,'403'),
(20,'501'), (21,'502'), (22,'503'), (23,'601'), (24,'602'), (25,'701'),
(26,'702'), (27,'801'), (28,'802'), (29,'901'), (30,'902'), (31,'1001'),
(32,'1002'), (33,'1101'), (34,'1102');

CREATE TABLE  Registro (
  ID_Registro INT NOT NULL, 
  Nom_Registro VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID_Registro)
);

INSERT INTO Registro (ID_Registro, Nom_Registro)
VALUES (0, 'Falla'), (1, 'Asiste'), (2, 'Asiste'), (3, 'Evasion'), (4, 'Falla Justificada');

CREATE TABLE  Estudiantes (
  ID_Estudiante INT NOT NULL,
  P_Nombre VARCHAR(20) NOT NULL,
  S_Nombre VARCHAR(20),
  T_Nombre VARCHAR(20),
  P_Apellido VARCHAR(20) NOT NULL,
  S_Apellido VARCHAR(20),
  Genero INT NOT NULL,
  T_Documento INT NOT NULL,
  Curso INT NOT NULL,
  Administradores INT NOT NULL,
  Registro INT NOT NULL,
  PRIMARY KEY(ID_Estudiante),
  FOREIGN KEY (Genero) REFERENCES Genero(ID_Genero),
  FOREIGN KEY (T_Documento) REFERENCES T_Documento(ID_Documento),
  FOREIGN KEY (Curso) REFERENCES Cursos(ID_Curso),
  FOREIGN KEY (Administradores) REFERENCES Administradores(ID_Admin),
  FOREIGN KEY (Registro) REFERENCES Registro(ID_Registro)
);

INSERT INTO Estudiantes (ID_Estudiante, P_Nombre, S_Nombre, T_Nombre, P_Apellido, S_Apellido, Genero, T_Documento, Curso, Administradores, Registro)
VALUES
(1029290082, 'MARTIN', 'DAVID', NULL, 'AVILA', 'DURAN', 1, 2, 22, 1022926852, 0),
(1023005795, 'JISEY', 'GABRIELA', NULL, 'BETANCOURT', 'GAVIRIA', 2, 2, 22, 1022926852, 0),
(1029289410, 'ERICK', 'SANTIAGO', NULL, 'CARDENAS', 'VELASQUEZ', 1, 2, 22, 1022926852, 0),
(1140924815, 'SARA', 'SOFIA', NULL, 'CASTILLO', 'ORDOÑEZ', 2, 2, 22, 1022926852, 0),
(1029289068, 'MARIA', 'ISABEL', NULL, 'CONTRERAS', 'HERRERA', 2, 2, 22, 1022926852, 0),
(1111201134, 'HEIDI', 'YULIANA', NULL, 'CRUZ', 'MUÑOZ', 2, 2, 22, 1022926852, 0),
(1018471323, 'DAVID', 'SANTIAGO', NULL, 'DONCEL', 'PEREZ', 1, 2, 22, 1022926852, 0),
(1025549947, 'MAICOL', 'JHOVANY', NULL, 'DUARTE', 'VEGA', 1, 4, 22, 1022926852, 0),
(1140925257, 'WILSON', 'EDUARDO', NULL, 'FLECHAS', 'GONZALEZ', 1, 2, 22, 1022926852, 0),
(1029287557, 'LUCIANA', 'VALENTINA', NULL, 'GOMEZ', 'YARA', 2, 2, 22, 1022926852, 0),
(1023000061, 'DANA', 'VALERIA', NULL, 'GONZALEZ', 'AGRESOTT', 2, 2, 22, 1022926852, 0),
(1022999355, 'SARA', 'SOFIA', NULL, 'GONZALEZ', 'BERNAL', 2, 2, 22, 1022926852, 0),
(1023001785, 'SAMUEL', 'ALEJANDRO', NULL, 'GUERRERO', 'GUZMAN', 1, 2, 22, 1022926852, 0),
(1023000512, 'ANGEL', 'SEBASTIAN', NULL, 'GUERRERO', 'RAMOS', 1, 2, 22, 1022926852, 0),
(1022976607, 'JOHN', 'FREDY', NULL, 'HERNANDEZ', 'ARGUMEDO', 1, 4, 22, 1022926852, 0),
(1028789872, 'JUAN', 'SEBASTIAN', NULL, 'HERNANDEZ', 'JOJOA', 1, 4, 22, 1022926852, 0),
(1022997745, 'DILAN', 'ANDREY', NULL, 'MACETO', 'RODRIGUEZ', 1, 2, 22, 1022926852, 0),
(1032186562, 'LUIGUI', 'MATIAS', NULL, 'MACHADO', 'ROVIRA', 1, 4, 22, 1022926852, 0),
(1022998766, 'FABIAN', 'STID', NULL, 'MEJIA', 'MADRIGAL', 1, 2, 22, 1022926852, 0),
(1025149988, 'SHARITH', NULL, NULL, 'MENDOZA', 'SARMIENTO', 2, 2, 22, 1022926852, 0),
(1023006773, 'LAURA', 'MARIANA', NULL, 'NIÑO', 'CAMARGO', 2, 2, 22, 1022926852, 0),
(1023002065, 'MARY', 'FERNANDA', NULL, 'NIVIA', 'ALVAREZ', 2, 2, 22, 1022926852, 0),
(1029288196, 'WILMER', 'SANTIAGO', NULL, 'NOVOA', 'HERRERA', 1, 2, 22, 1022926852, 0),
(1019101292, 'SANTIAGO', NULL, NULL, 'OSPINO', 'ALTAMIRANDA', 1, 2, 22, 1022926852, 0),
(1031151048, 'JHADE', 'VALENTINA', NULL, 'PATIÑO', 'SILVA', 2, 2, 22, 1022926852, 0),
(1028843462, 'SARA', 'VALENTINA', NULL, 'PEDRAZA', 'DAZA', 2, 2, 22, 1022926852, 0),
(1140925402, 'ZARAY', 'JULIANA', NULL, 'REYES', 'ACOSTA', 2, 2, 22, 1022926852, 0),
(1022980149, 'MERCY', 'TATIANA', NULL, 'RODRIGUEZ', 'GONZALEZ', 2, 4, 22, 1022926852, 0),
(1022998575, 'EMILY', 'SHARICK', NULL, 'RODRIGUEZ', 'QUINTERO', 2, 2, 22, 1022926852, 0),
(1028875367, 'NICOLAS', NULL, NULL, 'ROJAS', 'ALONSO', 1, 2, 22, 1022926852, 0),
(1054288613, 'ERIK', 'JUAN', 'PABLO', 'SAAVEDRA', 'BENAVIDES', 1, 2, 22, 1022926852, 0),
(1030649530, 'LINA', 'VALENTINA', NULL, 'SABOGAL', 'REAL', 2, 2, 22, 1022926852, 0),
(1022998279, 'SARA', 'ISABELA', NULL, 'SANCHEZ', 'RIVERA', 2, 2, 22, 1022926852, 0),
(1013140460, 'MARIA', 'ALEJANDRA', NULL, 'SOLANO', 'PERILLA', 2, 2, 22, 1022926852, 0);

  CREATE VIEW Vista_Admin AS
  SELECT 
    A.ID_Admin AS 'Documento',
    R.Nombre_Rol AS 'Rol',
    C.Contrasenia AS 'Contraseña',
    T.Tipo_Documento AS 'Tipo de documento',
    CONCAT(P_Nombre, ' ', S_Nombre, ' ', T_Nombre, ' ', P_Apellido, ' ', S_Apellido) AS 'Nombre completo',
    G.Nom_Genero AS 'Genero' 
  FROM Administradores A 
  INNER JOIN Rol R ON R.ID_Rol = A.Rol 
  INNER JOIN Clave C ON C.ID_Clave = A.Clave 
  INNER JOIN T_Documento T ON T.ID_Documento = A.T_Documento 
  INNER JOIN Genero G ON G.ID_Genero = A.Genero;

CREATE VIEW Vista_Estu AS
SELECT 
  E.ID_Estudiante AS 'Documento',
  CONCAT(E.P_Nombre, ' ', E.S_Nombre, ' ', E.P_Apellido, ' ', E.S_Apellido) AS 'Nombres',
  G.Nom_Genero AS 'Genero',
  T.Tipo_Documento AS 'Tipo de documento',
  C.Num_Curso AS 'Curso',
  CONCAT(A.P_Nombre, ' ', A.P_Apellido) AS 'Administradores',
  R.Nom_Registro AS 'Registro'
FROM Estudiantes E 
INNER JOIN Genero G ON G.ID_Genero = E.Genero
INNER JOIN T_Documento T ON T.ID_Documento = E.T_Documento
INNER JOIN Cursos C ON C.ID_Curso = E.Curso
INNER JOIN Administradores A ON A.ID_Admin = E.Administradores
INNER JOIN Registro R ON R.ID_Registro = E.Registro;
