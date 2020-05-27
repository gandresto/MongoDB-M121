db.nycFacilities.aggregate([
{
	'$geoNear': {
		'near': {
			'type':"Point",
			'coordinates' : [-73.98769766, 40.75734523]
		},
		'distanceField': "distanceFromMongoDB",
		'spherical':true
	}
}
]).pretty();

db.nycFacilities.aggregate([
{
	'$geoNear': {
		'near': {
			'type':"Point",
			'coordinates' : [-73.98769766, 40.75734523]
		},
		'distanceField': "distanceFromMongoDB",
		'spherical':true,
		'query': {'type': 'Hospital'},
	}
},
{
	'$limit':5
}
]).pretty();