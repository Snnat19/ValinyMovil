exports.seed = function(knex) {
    return knex('T_Documento').del()
      .then(function () {
        return knex('T_Documento').insert([
          { ID_Documento: 1, Tipo_Documento: 'Cédula de Ciudadanía' },
          { ID_Documento: 2, Tipo_Documento: 'Tarjeta de Identidad' },
          { ID_Documento: 3, Tipo_Documento: 'Cédula de Extranjería' },
          { ID_Documento: 4, Tipo_Documento: 'Registro Civil de Nacimiento' }
        ]);
      });
  };
  