exports.seed = function(knex) {
    return knex('Cursos').del()
      .then(function () {
        return knex('Cursos').insert([
          { ID_Curso: 1, Num_Curso: 'PJ01' },
          { ID_Curso: 2, Num_Curso: 'J01' },
          { ID_Curso: 3, Num_Curso: 'J02' },
          { ID_Curso: 4, Num_Curso: 'J03' },
          { ID_Curso: 5, Num_Curso: 'T01' },
          { ID_Curso: 6, Num_Curso: 'T02' },
          { ID_Curso: 7, Num_Curso: 'T03' },
          { ID_Curso: 8, Num_Curso: '101' },
          { ID_Curso: 9, Num_Curso: '102' },
          { ID_Curso: 10, Num_Curso: '103' },
          { ID_Curso: 11, Num_Curso: '201' },
          { ID_Curso: 12, Num_Curso: '202' },
          { ID_Curso: 13, Num_Curso: '203' },
          { ID_Curso: 14, Num_Curso: '301' },
          { ID_Curso: 15, Num_Curso: '302' },
          { ID_Curso: 16, Num_Curso: '303' },
          { ID_Curso: 17, Num_Curso: '401' },
          { ID_Curso: 18, Num_Curso: '402' },
          { ID_Curso: 19, Num_Curso: '403' },
          { ID_Curso: 20, Num_Curso: '501' },
          { ID_Curso: 21, Num_Curso: '502' },
          { ID_Curso: 22, Num_Curso: '503' },
          { ID_Curso: 23, Num_Curso: '601' },
          { ID_Curso: 24, Num_Curso: '602' },
          { ID_Curso: 25, Num_Curso: '701' },
          { ID_Curso: 26, Num_Curso: '702' },
          { ID_Curso: 27, Num_Curso: '801' },
          { ID_Curso: 28, Num_Curso: '802' },
          { ID_Curso: 29, Num_Curso: '901' },
          { ID_Curso: 30, Num_Curso: '902' },
          { ID_Curso: 31, Num_Curso: '1001' },
          { ID_Curso: 32, Num_Curso: '1002' },
          { ID_Curso: 33, Num_Curso: '1101' },
          { ID_Curso: 34, Num_Curso: '1102' }

        ]);
      });
  };
  