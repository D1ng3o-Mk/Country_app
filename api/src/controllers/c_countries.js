const { Country , Activity , Region , Subregion } = require('../db');
const { Op } = require('sequelize');


const getall = (req, res, next) => {

	let { name } = req.query;

	if (name) {

		return Country.findAll({
			where: { name: { [Op.iLike]: `%${poblation}%` } },
			//where: {population: {[Op.gt]:name} },
			include: {
				model: Subregion,
				attributes: ['name'],
				include: {
					model: Region,
					attributes: ['name']
				}
			}
		})
		
		.then((countries) => res.json(countries))
		.catch((err) => next(err));
	}

	return Country.findAll({
        
		include: [{
				model: Activity,
				through: {
					attributes: [],
				},
			},{
				model: Subregion,
				attributes: ['name'],
				include: {
					model: Region,
					attributes: ['name'],
				}
			}]

	})

	.then((countries) => res.json(countries))
	.catch((err) => next(err));

};

const getallbyid = (req, res, next) => {

	let { idCountry } = req.params;

	return Country.findOne({
		where: { id: { [Op.iLike]: idCountry } },
		include: [{
			model: Activity,
			through: {
				attributes: [],
			},
		},{
			model: Subregion,
			attributes: ['name'],
			include: {
				model: Region,
				attributes: ['name']
			}
		}],
	})
    
	.then((country) => res.json(country))
	.catch((err) => next(err));
};

module.exports = { getall, getallbyid }