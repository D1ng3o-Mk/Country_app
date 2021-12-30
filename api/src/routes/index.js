const { Router } = require('express');
const countriesRouter = require('./countries');
const activityRouter = require('./activity');
const regionRouter = require('./regions');

const router = Router();

router.use('/countries', countriesRouter);
router.use('/activity', activityRouter);
router.use('/regions', regionRouter);

module.exports = router;
