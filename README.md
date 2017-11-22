# Consul Telemetry Exporter
[![Build Status](https://api.travis-ci.org/SWCE/consul_telemetry_exporter.svg?branch=master)](http://travis-ci.org/SWCE/consul_telemetry_exporter)
[![Coverage Status](https://coveralls.io/repos/github/SWCE/consul_telemetry_exporter/badge.svg)](https://coveralls.io/github/SWCE/consul_telemetry_exporter)
[![bitHound Overall Score](https://www.bithound.io/github/SWCE/consul_telemetry_exporter/badges/score.svg)](https://www.bithound.io/github/SWCE/consul_telemetry_exporter)
[![Known Vulnerabilities](https://snyk.io/test/github/SWCE/consul_telemetry_exporter/badge.svg)](https://snyk.io/test/github/SWCE/consul_telemetry_exporter)
[![dependencies Status](https://david-dm.org/SWCE/consul_telemetry_exporter/status.svg)](https://david-dm.org/SWCE/consul_telemetry_exporter)
[![devDependencies Status](https://david-dm.org/SWCE/consul_telemetry_exporter/dev-status.svg)](https://david-dm.org/SWCE/consul_telemetry_exporter?type=dev)
[![HitCount](http://hits.dwyl.io/SWCE/consul_telemetry_exporter.svg)](http://hits.dwyl.io/SWCE/consul_telemetry_exporter)

[![https://nodei.co/npm/consul_telemetry_exporter.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/consul-telemetry-exporter.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/consul-telemetry-exporter)

Prometheus exporter for [consul telemetry metrics](https://www.consul.io/docs/agent/telemetry.html).

Any reported metric on the [metrics endpoint](https://www.consul.io/api/agent.html#view-metrics) will be exposed.

## Installation

    $ npm install -g consul-telemetry-exporter

## running

    $ consul-telemetry-exporter
    
Will run on port 9320 by default, can be override using the `PORT` env variable

Will use consul host from `CONSUL_HOST` or `HOSTNAME` env variables or the localhost in that order

Will use port 8500 port by default, can be override using the `CONSUL_PORT` env variable
