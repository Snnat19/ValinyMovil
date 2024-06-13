exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Genero').del()
      .then(function () {
        // Inserts seed entries
        return knex('Genero').insert([
          { ID_Genero: 1, Nom_Genero: 'Masculino' },
          { ID_Genero: 2, Nom_Genero: 'Femenino' }
        ]);
      });
  };
  