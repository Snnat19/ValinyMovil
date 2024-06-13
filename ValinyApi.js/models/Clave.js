const db = require('../config/config');
const crypto = require('crypto');

function aesEncrypt(text, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const Clave = {};
Clave.getById = async (id, result) => {
    const sql = `SELECT * FROM clave WHERE ID_Clave = ?`;
    db.query(sql, [id], (err, res) => {
        if (err) {
            console.log('Error al obtener la clave: ', err);
            result(err, null);
        } else {
            console.log('Clave obtenida correctamente');
            result(null, res);
        }
    });
};


Clave.create = async (clave, result) => {
    // Encripta la contraseña antes de insertarla en la base de datos
    const encryptedPassword = aesEncrypt(clave.Contrasenia, 'HJCJ75');

    const sql = `INSERT INTO clave (Contrasenia) VALUES (?)`;
    db.query(sql, [encryptedPassword], (err, res) => {
        if (err) {
            console.log('Error al crear la clave: ', err);
            result(err, null);
        } else {
            console.log('Clave creada correctamente');
            // Obtiene la clave que acabas de crear
            Clave.getById(res.insertId, (err, claveCreada) => {
                if (err) {
                    console.log('Error al obtener la clave: ', err);
                    result(err, null);
                } else {
                    console.log('Clave obtenida correctamente');
                    // Devuelve la clave que acabas de crear
                    result(null, claveCreada);
                }
            });
        }
    });
};


module.exports = Clave;
