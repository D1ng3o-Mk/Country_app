const { Router } = require('express');
const router = Router();
const { getall , getallbyid } = require('../controllers/c_countries');


router.get('/', getall);

router.get('/:idCountry', getallbyid);


module.exports = router;