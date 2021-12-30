const { Region } = require('../db.js');


const get_region = (req,res,next) => {

	return Region.findAll({ 
		attributes: ['name'],
	})
	
	.then((regions) => res.json(regions))
	.catch((err) => next(err));	
    
};

module.exports = get_region;