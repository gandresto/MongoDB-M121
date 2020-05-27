// Encontrar la temperatura promedio más alta
db.icecream_data.aggregate([
  {
    '$project': {
      '_id': 0,
      'max_high': {
        '$reduce': { // Toma un arreglo
          'input': '$trends',
          'initialValue': -Infinity, // Valor del acumulador con el cual empezar
          'in': { // lógica
            '$cond': [
              // si el campo avg_high_temp es mayor al valor actual del acumulador
              { '$gt': ["$$this.avg_high_tmp", "$$value"] }, 
              "$$this.avg_high_tmp", // retorna avg_high_temp
              "$$value" // en caso contrario, el acumulador
            ]
          }
        }
      }
    }
  }
])

// Calculo el máximo del promedio de temperaturas más altas
db.icecream_data.aggregate([
  {
    '$project': {
      '_id': 0,
      'max_high': { '$max': '$trends.avg_high_tmp' }
    }
  }
])

// Calculo el mínimo del promedio de temperaturas más bajas
db.icecream_data.aggregate([
  {
    '$project': {
      '_id': 0,
      'max_max_low': { '$min': '$trends.avg_low_tmp' }
    }
  }
])

// Desviación estándar
db.icecream_data.aggregate([
  {
    '$project': {
      '_id': 0,
      'avg_cpi': { '$avg': '$trends.icecream_cpi' },
      // Usamos $stdDevPop porque lo usamos con toda la información
      'cpi_std': { '$stdDevPop': '$trends.icecream_cpi' },
      // De trabajar con muestras, debemos usar $stdDevSamp
    }
  }
])

// Acc sum
db.icecream_data.aggregate([
  {
    '$project': {
      '_id': 0,
      'yearly_sales (millions)': { 
        '$sum': '$trends.icecream_sales_in_millions' 
      },
    }
  }
])