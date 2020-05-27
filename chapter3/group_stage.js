
db.movies.aggregate([
  {
    '$group' : { 
      '_id' : '$year', 
    }
  },
]);

db.movies.aggregate([
  {
    '$group' : { 
      '_id' : '$year', 
      // Cada que la etapa categoriza documentos, 
      // la expresión sum es llamada
      'films_count' : { '$sum':1 } // Suma uno por cada documento
    }
  },
  {
    '$sort' : {
      'films_count' : -1
    }
  }
]);

db.movies.aggregate([
  {
    '$group' : { 
      '_id' : {
        'numDirectors' : { // nuevo campo '_id.numDirectors'
          '$cond': [
            { '$isArray' : '$directors'}, // condición
            { '$size' : '$directors'}, // si es verdadera
            0 // si es falsa
          ]
        }
      }, 
      'numFilms' : { '$sum':1 },
      'averageMetacritic' : { '$avg':"$metacritic" },
    }
  },
  {
    '$sort' : {
      '_id.numDirectors' : -1,
      'avgerageMetacritic':-1
    }
  }
]);

db.movies.aggregate([
  {
    '$group' : { 
      // Si queremos agrupar todos los documentos
      // pasamos null al campo _id
      '_id' : null, 
      'count' : { '$sum' : 1}
    }
  }
]);

// Calcula el promedio de todos los documentso que 
// tengan score en metacritic
db.movies.aggregate([
  {
    '$match' : { 
      'metacritic': {$gt:0}
    }
  },
  {
    '$group' : { 
      '_id' : null, 
      'minMetacritic' : { '$min' : '$metacritic'},
      'avgMetacritic' : { '$avg' : '$metacritic'},
      'maxMetacritic' : { '$max' : '$metacritic'},
    }
  }
]);