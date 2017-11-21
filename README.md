# Consul Telemetry Exporter
[![Build Status](https://api.travis-ci.org/tj/consul_telemetry_exporter.js.svg?branch=master)](http://travis-ci.org/tj/consul_telemetry_exporter.js)
[![NPM Version](http://img.shields.io/npm/v/consul_telemetry_exporter.svg?style=flat)](https://www.npmjs.org/package/consul_telemetry_exporter)
[![NPM Downloads](https://img.shields.io/npm/dm/consul_telemetry_exporter.svg?style=flat)](https://www.npmjs.org/package/consul_telemetry_exporter)

Prometheus exporter for [consul telemetry metrics](https://www.consul.io/docs/agent/telemetry.html).

Any reported metric on the [metrica endpoint](https://www.consul.io/api/agent.html#view-metrics) will be exposed.

## Installation

    $ npm install -g consul_telemetry_exporter

## running

    $ consul_telemetry_exporter

will run on port 7569 by default, can be override using the PORT env variable
