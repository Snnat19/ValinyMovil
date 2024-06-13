exports.seed = function(knex) {
    return knex('Administradores').del()
      .then(function () {
        return knex('Administradores').insert([
          { ID_Admin: 1022923336, Rol: 3, Clave: 1, T_Documento:1, P_Nombre: 'Cristian', S_Nombre: 'David', T_Nombre: null, P_Apellido: 'Lombana', S_Apellido: 'Bernate', Genero: 1},
          { ID_Admin: 1140914036, Rol: 1, Clave: 2, T_Documento:1, P_Nombre: 'Heidy', S_Nombre: 'Jireth', T_Nombre: null, P_Apellido: 'Prieto', S_Apellido: 'García', Genero: 2},
          { ID_Admin: 1022926852, Rol: 2, Clave: 3, T_Documento:1, P_Nombre: 'Jean', S_Nombre: 'Pierre', T_Nombre: 'Daniel', P_Apellido: 'Nieto', S_Apellido: 'Gaona', Genero: 1},
          { ID_Admin: 1234567890, Rol: 4, Clave: 5, T_Documento:1, P_Nombre: 'Super', S_Nombre: null, T_Nombre: null, P_Apellido: 'Admin', S_Apellido: null, Genero: 2},
          { ID_Admin: 1000695329, Rol: 3, Clave: 4, T_Documento:1, P_Nombre: 'Jhon', S_Nombre: 'Andrey', T_Nombre: null, P_Apellido: 'Luna', S_Apellido: 'Moreno', Genero: 1},
          { ID_Admin: 1014657845, Rol: 3, Clave: 6, T_Documento:1, P_Nombre: 'Erik', S_Nombre: 'Santiago', T_Nombre: null, P_Apellido: 'Ricaurte', S_Apellido: 'Castañeda', Genero: 1},

        ]);
      });
  };
  