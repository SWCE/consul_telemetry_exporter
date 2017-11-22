const express = require('express');
const client = require('prom-client');
const rp = require('request-promise');
const _ = require('underscore');
const os = require('os');

const router = express.Router();

const hostname = process.env.CONSUL_HOST || process.env.HOSTNAME || os.hostname();
const port = process.env.CONSUL_PORT || 8500;

/* GET metrics listing. */
router.get('/', function(req, res) {
  collect().then(function (metrics) {
    res.send(metrics);
  }).catch(function (err) {
    res.status(500).send(err);
  });
});

module.exports = router;

function collect() {
  const options = {
    uri: 'http://' + hostname + ':' + port + '/v1/agent/metrics',
    json: true
  };

  return rp(options).then(createPrometheusMetrics);
}

function createPrometheusMetrics(result) {
  const registry = new client.Registry();
  const metrics = {};
  result.Gauges.forEach(_handleGauge);
  result.Counters.forEach(_handleCounter);
  result.Samples.forEach(_handleCounter);
  return registry.metrics();

  function _handleCounter(counter) {
    _setGauge(counter.Name + '_count', _.extend({'statistic': 'count'}, counter.Labels), counter.Count);
    _setGauge(counter.Name + '_sum', _.extend({'statistic': 'sum'}, counter.Labels), counter.Sum);
    _setGauge(counter.Name + '_min', _.extend({'statistic': 'min'}, counter.Labels), counter.Min);
    _setGauge(counter.Name + '_max', _.extend({'statistic': 'max'}, counter.Labels), counter.Max);
    _setGauge(counter.Name + '_mean', _.extend({'statistic': 'mean'}, counter.Labels), counter.Mean);
    _setGauge(counter.Name + '_stddev', _.extend({'statistic': 'stddev'}, counter.Labels), counter.Stddev);
  }

  function _handleGauge(gauge) {
    _setGauge(gauge.Name, gauge.Labels, gauge.Value);
  }

  function _setGauge(name, labels, value) {
    labels.host = hostname;
    let metricName = _sanitize(name);
    const gaugeMetric = metrics[metricName] || new client.Gauge({
      name: metricName.toLowerCase(),
      help: metricName.toLowerCase() + '_help',
      labelNames: Object.keys(labels),
      registers: [registry]
    });
    gaugeMetric.set(labels, value);
    metrics[metricName] = gaugeMetric;
  }

  function _sanitize(name) {
    return name.replace(/[^a-zA-Z0-9:_]/g, '_');
  }
}
