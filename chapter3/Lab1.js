// Lab - $group and Accumulators
// Problem:

// In the last lab, we calculated a normalized rating that required us 
// to know what the minimum and maximum values for imdb.votes were. 
// These values were found using the $group stage!

// For all films that won at least 1 Oscar, calculate the standard deviation, 
// highest, lowest, and average imdb.rating. Use the sample standard deviation expression.

// HINT - All movies in the collection that won an Oscar begin with a string 
// resembling one of the following in their awards field

// Won 13 Oscars
// Won 1 Oscar

pipeline = []

match_stage = {
  '$match': {
    'awards': /^Won \d+ Oscar/i,
    'imdb.rating': { '$gt': 0 }
  }
}
pipeline.push(match_stage)

project_stage = {
  '$project': { 'rating':'$imdb.rating' }
}
pipeline.push(project_stage)

group_stage = {
  '$group': { 
    '_id': 0,
    'high': { '$max': '$rating'},
    'low': { '$min': '$rating'},
    'avg': { '$avg': '$rating'},
    'std': { '$stdDevSamp': '$rating'},
   }
}
pipeline.push(group_stage)