const express = require('express');
const apiRoutes = require('./api');

const router = express.Router();

router.use('/api', apiRoutes);

router.route('/status')
  .get((req, res) => res.send('OK'));

module.exports = router;
