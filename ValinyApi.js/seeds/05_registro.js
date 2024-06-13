exports.seed = function(knex) {
    return knex('Registro').del()
      .then(function () {
        return knex('Registro').insert([
          { ID_Registro: 0, Nom_Registro: 'Falla' },
          { ID_Registro: 1, Nom_Registro: 'Asiste' },
          { ID_Registro: 2, Nom_Registro: 'Retardo' },
          { ID_Registro: 3, Nom_Registro: 'Evacion' },
          { ID_Registro: 4, Nom_Registro: 'Justificada' }

        ]);
      });
  };
  