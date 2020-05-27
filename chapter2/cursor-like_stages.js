db.solarSystem.aggregate([
{
	'$project': {
		'_id': 0,
		'name': 1,
		'numberOfMoons': 1,
	}
},
{
	'$limit':5
}
]);

db.solarSystem.aggregate([
{
	'$project': {
		'_id': 0,
		'name': 1,
		'numberOfMoons': 1,
	}
},
{
	'$skip':1
}
]);