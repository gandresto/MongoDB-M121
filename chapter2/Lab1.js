// MongoDB has another movie night scheduled. 
// This time, we polled employees for their favorite 
// actress or actor, and got these results

// favorites = [
//   "Sandra Bullock",
//   "Tom Hanks",
//   "Julia Roberts",
//   "Kevin Spacey",
//   "George Clooney"]

// For movies released in the USA with a tomatoes.viewer.rating 
// greater than or equal to 3, calculate a new field called 
// num_favs that represets how many favorites appear in the 
// cast field of the movie.

// Sort your results by num_favs, tomatoes.viewer.rating, and 
// title, all in descending order.

// What is the title of the 25th film in the aggregation result?

var favorites = [
	"Sandra Bullock",
	"Tom Hanks",
	"Julia Roberts",
	"Kevin Spacey",
	"George Clooney"
];

pipeline = [];

// For movies released in the USA with a tomatoes.viewer.rating 
// greater than or equal to 3...

match_stage = {
	'$match' : {
		'countries': 'USA',
		'tomatoes.viewer.rating': { '$gt': 3 },
		'cast' : { '$in' : favorites },
	}
};

pipeline.push(match_stage);

project_stage = {
	'$project' : {
		'title':1,
		'countries':1,
		'rating': '$tomatoes.viewer.rating',
		'favInCast' : {
			'$setIntersection' : [ favorites, '$cast' ]
		},
	}
};

// calculate a new field called num_favs that represets
// how many favorites appear in the 
// cast field of the movie.

pipeline.push(project_stage);

add_field = {
	'$addFields' : {
		'num_favs': {
			'$cond' : [
				{ '$isArray': '$favInCast'},
				{ '$size': '$favInCast'},
				0
			]
		}	
	}
}

pipeline.push(add_field);

// Sort your results by num_favs, tomatoes.viewer.rating, and 
// title, all in descending order.

sort_stage = {
	'$sort' : {
		'num_favs': -1,
		'rating': -1,
		'title': -1,
	}
}

pipeline.push(sort_stage);

// What is the title of the 25th film in the aggregation result?

skip_stage = {
	'$skip' : 24
}

pipeline.push(skip_stage);


limit_stage = {
	'$limit' : 1
}

pipeline.push(limit_stage);

// db.movies.aggregate(pipeline).pretty();

