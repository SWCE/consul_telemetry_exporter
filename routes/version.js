const express = require('express');
const package = require('./../package.json');
const router = express.Router();

/* GET metrics listing. */
router.get('/', function (req, res) {
  collect().then(function (metrics) {
    res.send(package.version);
  }).catch(function (err) {
    res.status(500).send(err);
  });
});

module.exports = router;
