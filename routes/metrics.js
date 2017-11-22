const express = require('express');
const client = require('prom-client');
const rp = require('request-promise');
const _ = require('underscore');
const os = require('os');
const logger = require('./../lib/logger');
const prometheus = require('./../lib/prometheus');

const router = express.Router();

const registry = client.register;
const hostname = process.env.CONSUL_HOST || process.env.HOSTNAME || os.hostname();
const port = process.env.CONSUL_PORT || 8500;

/* GET metrics listing. */
router.get('/', function (req, res) {
  collect().then(function (metrics) {
    res.type('text/plain; version=0.0.4; charset=utf-8').send(metrics);
  }).catch(function (err) {
    logger.error('Error in metrics collection ' + err);
    const statusCode = (err || {}).statusCode || 500;
    res.status(statusCode).send(err);
  });
});

module.exports = router;

function collect() {
  let uri = 'http://' + hostname + ':' + port + '/v1/agent/metrics';
  const options = {
    uri: uri,
    json: true
  };
  logger.debug('Making request to consul @ ' + uri);
  return rp(options).then(createPrometheusMetrics);
}

function createPrometheusMetrics(result) {
  const metrics = {};
  result.Gauges.forEach(_handleGauge);
  result.Counters.forEach(_handleCounter);
  result.Samples.forEach(_handleCounter);
  logger.debug('Finished building metrics object');
  const res =  registry.metrics();
  registry.clear();
  return res;

  function _handleCounter(counter) {
    _setGauge(counter.Name, _.extend({'statistic': 'count'}, counter.Labels), counter.Count);
    _setGauge(counter.Name, _.extend({'statistic': 'sum'}, counter.Labels), counter.Sum);
    _setGauge(counter.Name, _.extend({'statistic': 'min'}, counter.Labels), counter.Min);
    _setGauge(counter.Name, _.extend({'statistic': 'max'}, counter.Labels), counter.Max);
    _setGauge(counter.Name, _.extend({'statistic': 'mean'}, counter.Labels), counter.Mean);
    _setGauge(counter.Name, _.extend({'statistic': 'stddev'}, counter.Labels), counter.Stddev);
  }

  function _handleGauge(gauge) {
    _setGauge(gauge.Name, gauge.Labels, gauge.Value);
  }

  function _setGauge(name, labels, value) {
    let metricName = prometheus.sanitize(name);
    const gaugeMetric = metrics[metricName] || new client.Gauge({
      name: metricName.toLowerCase(),
      help: metricName.toLowerCase() + '_help',
      labelNames: Object.keys(labels),
      registers: [registry]
    });
    gaugeMetric.set(labels, value);
    metrics[metricName] = gaugeMetric;
  }
}
