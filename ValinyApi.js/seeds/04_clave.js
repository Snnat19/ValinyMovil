const crypto = require('crypto');

function aesEncrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

exports.seed = function(knex) {
  return knex('Clave').del()
    .then(function () {
      return knex('Clave').insert([
        { ID_Clave: 1, Contrasenia: aesEncrypt('1022923336', 'HJCJ75') },
        { ID_Clave: 2, Contrasenia: aesEncrypt('1140914036', 'HJCJ75') },
        { ID_Clave: 3, Contrasenia: aesEncrypt('1022926852', 'HJCJ75') },
        { ID_Clave: 4, Contrasenia: aesEncrypt('1000695329', 'HJCJ75') },
        { ID_Clave: 5, Contrasenia: aesEncrypt('1234567890', 'HJCJ75') },
        { ID_Clave: 6, Contrasenia: aesEncrypt('1014657845', 'HJCJ75') }
      ]);
    });
};
