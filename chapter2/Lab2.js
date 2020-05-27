// Chapter 2: Basic Aggregation - Utility Stages

// Lab - Bringing it all together
// Problem:

// Calculate an average rating for each movie in our collection 
// where English is an available language, the minimum imdb.rating 
// is at least 1, the minimum imdb.votes is at least 1, and 
// it was released in 1990 or after. You'll be required to 
// rescale (or normalize) imdb.votes. The formula to rescale 
// imdb.votes and calculate normalized_rating is included as a handout.

// What film has the lowest normalized_rating?

var pipeline = []

match_stage = {
	'$match': {
		  'languages': 'English', 
		  'imdb.rating': {'$gte': 1}, 
		  'released': { '$gte': ISODate('1990-01-01 00:00:00Z')	}
	}
};

pipeline.push(match_stage);

project_stage = {
  '$project': {
    'title': 1, 
    'rating': '$imdb.rating', 
    'votes': '$imdb.votes'
  }
}

pipeline.push(project_stage)

x_max = 1521105
x_min = 5
min = 1
max = 10

scaled_votes = {
  '$add': [
    1, {
      '$multiply': [
        9, {
          '$divide': [
          	{ '$subtract': ['$votes', x_min] }, 
          	{ '$subtract': [x_max, x_min] }
          ]
        }
      ]
    }
  ]
}

add_fields_stage = {
  '$addFields': {
    'normalized_rating': {
      '$avg': [
        '$rating', scaled_votes
      ]
    }
  }
}

pipeline.push(add_fields_stage)

sort_stage = { '$sort': { 'normalized_rating': 1 }}

pipeline.push(sort_stage)

limit_stage =  { '$limit': 1 }

pipeline.push(limit_stage)