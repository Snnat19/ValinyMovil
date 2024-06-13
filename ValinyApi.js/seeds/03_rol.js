exports.seed = function(knex) {
  return knex('Rol').del()
    .then(function () {
      return knex('Rol').insert([
        { ID_Rol: 1, Nombre_Rol: 'Directivo' },
        { ID_Rol: 2, Nombre_Rol: 'Orientador' },
        { ID_Rol: 3, Nombre_Rol: 'Docente' },
        { ID_Rol: 4, Nombre_Rol: 'SuperAdmin' }
      ]);
    });
};
