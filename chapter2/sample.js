db.nycFacilities.aggregate([
	{
		$sample: {size: 200}
	}
]).pretty();