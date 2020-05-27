db.solarSystem.aggregate([
		{
			'$match': {
				'type': {'$ne': "Star"}
			}
		}
	]
).pretty()

db.solarSystem.aggregate([
		{
			'$match': {
				'type': {'$ne': "Star"}
			}
		},
		{
			'$count': "planets"
		}
	]
).pretty()