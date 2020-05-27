var pipeline = [
  {
    '$project' : {
      'cast':1,
      'directors':1,
      'writers': {
        '$map': {
          'input': "$writers",
          'as': "writer",
          'in': {
            '$arrayElemAt': [ // obtengo el elemento 0 (escritor)
              {
                '$split': [ "$$writer", " (" ] // separo la cadena en un arreglo
              },
              0
            ]
          }
        }
      }
    }
  },
  {
    '$project' : {
      'involucrados' : {
        '$setIntersection' : ['$cast', '$directors', '$writers']
      }
    }
  }
]

// Problem:
// Let's find how many movies in our movies collection are a "labor of love", where the same person appears in cast, directors, and writers
// Hint: You will need to use $setIntersection operator in the aggregation pipeline to find out the result.
// Note that your dataset may have duplicate entries for some films. You do not need to count the duplicate entries.
// To get a count after you have defined your pipeline, there are two simple methods.