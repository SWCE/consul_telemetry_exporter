const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'consul_telemetry_exporter'});
});

module.exports = router;
