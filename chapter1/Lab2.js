// Lab - Changing Document Shape with $project
// Problem:

// Our first movie night was a success. Unfortunately, our ISP called to let us know we're close to our bandwidth quota, but we need another movie recommendation!

// Using the same $match stage from the previous lab, add a $project stage to only display the the title and film rating (title and rated fields).

var pipeline = [
	{
		'$match': {
			'imdb.rating': {'$gte':7},
			'genres': {'$nin': ['Crime', 'Horror'] },
			'rated': {'$in': ['PG', 'G']},
			'languages' : { '$all': ['English', 'Japanese']}
		}
	},
	{
		'$project': {
			'title':1,
			'rated':1,
			'_id':0
		}
	}
]
db.movies.aggregate(pipeline).pretty()