const { Router } = require('express');
const router = Router();
const get_region = require('../controllers/c_regions');

router.get('/',get_region );

module.exports = router;