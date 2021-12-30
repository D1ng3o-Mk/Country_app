const { Country, Activity } = require('../db');

const post_act = (req, res, next) => {

	let { name, difficult, duration, season, countries } = req.body;
	name = name.toLowerCase();
	return Activity.findOrCreate({
		where: { name },
		defaults: {
			difficult,
			duration,
			season,
		},
	})
	
	.then(async ([activityRes, created]) => {

		if (countries) {
			
			let countriesArr = countries.split(',');
			for (let id of countriesArr) {
				let countryRes = await Country.findByPk(id);
				await activityRes.addCountry(countryRes);
				await countryRes.addActivity(activityRes);
			}
		}
		return res.json(activityRes);
	})
	.catch((err) => next(err));
};


const get_act =  (req, res, next) => {

	return Activity.findAll()
	.then((activities) => {
		return res.json(activities);
	})
	.catch((err) => next(err));
};


module.exports = { post_act , get_act }