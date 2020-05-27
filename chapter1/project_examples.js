db.solarSystem.aggregate([
	{ '$project' : 
		{
			'name' : 1,
			'gravity':1
		}
	}
]);

db.solarSystem.aggregate([
	{ '$project' : 
		{
			'_id' : 0,
			'name' : 1,
			'gravity.value':1
		}
	}
]);

db.solarSystem.aggregate([
	{ '$project' : 
		{
			'_id' : 0,
			'name' : 1,
			// Asigno el campo gravity.value al campo existente gravity
			'gravity': "$gravity.value" 
		}
	}
]);

db.solarSystem.aggregate([
	{ '$project' : 
		{
			'_id' : 0,
			'name' : 1,
			// Asigno el campo gravity.value a un campo nuevo surfaceGravity
			'surfaceGravity': "$gravity.value" 
		}
	}
]);

db.solarSystem.aggregate([
	{ '$project' : 
		{
			'_id' : 0,
			'name' : 1,
			// Uso expresiones para calcular mi peso en cada planeta 
			// Mi peso en cada planeta es gravRatio * miPesoEnLaTierra
			// Gravity Ratio es gravedadEnPlaneta / gravedadEnLaTierra
			'miPeso': {
				'$multiply' : [
					{ '$divide': ["$gravity.value", 9.8] }, // Gravity ratio
					63.0
				]
			}
		}
	}
]);