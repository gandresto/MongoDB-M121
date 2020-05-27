db.solarSystem.aggregate([
{
	'$match': {'type':'Terrestrial planet'}
},
{
	'$project': {
		'_id': 0,
		'name': 1,
		'numberOfMoons': 1,
	}
},
{
	'$count': 'Planetas sólidos'
}
]);