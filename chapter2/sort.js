db.solarSystem.aggregate([
{
	'$project': {
		'_id': 0,
		'name': 1,
		'numberOfMoons': 1,
	}
},
{
	'$sort': {'numberOfMoons':-1}
}
]);

db.solarSystem.aggregate([
{
	'$project': {
		'_id': 0,
		'name': 1,
		'numberOfMoons': 1,
		'hasMagneticField': 1,
	}
},
{
	// La etapa de ordenado no está limitada a un campo
	'$sort': {
		'numberOfMoons':-1,
		'hasMagneticField':-1
	}
}
]);

db.solarSystem.aggregate([
{
	'$project': {
		'_id': 0,
		'name': 1,
		'numberOfMoons': 1,
		'hasMagneticField': 1,
	}
},
{
	'$sort': {
		'hasMagneticField':-1  // Primero ordena por campo magnético
		'numberOfMoons':-1, // Luego por número de lunas
	}
}
]);

// Si la etapa de sort está al inicio del pipeline,
// puede hacer uso de los índices, reduciendo el uso
// en memoria para la consulta

// Las operaciones de ordenamiento están limitadas a 
// 100 MB de RAM por defecto