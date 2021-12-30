const { Router } = require('express');
const {post_act , get_act}= require('../controllers/c_activity');
const router = Router();

router.post('/', post_act );

router.get('/', get_act );

module.exports = router;