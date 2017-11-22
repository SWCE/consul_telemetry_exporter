# Consul Telemetry Exporter
[![Build Status](https://api.travis-ci.org/SWCE/consul_telemetry_exporter.svg?branch=master)](http://travis-ci.org/SWCE/consul_telemetry_exporter)
[![NPM Version](http://img.shields.io/npm/v/consul-telemetry-exporter.svg?style=flat)](https://www.npmjs.org/package/consul-telemetry-exporter)
[![NPM Downloads](https://img.shields.io/npm/dm/consul-telemetry-exporter.svg?style=flat)](https://www.npmjs.org/package/consul-telemetry-exporter)

Prometheus exporter for [consul telemetry metrics](https://www.consul.io/docs/agent/telemetry.html).

Any reported metric on the [metrics endpoint](https://www.consul.io/api/agent.html#view-metrics) will be exposed.

## Installation

    $ npm install -g consul-telemetry-exporter

## running

    $ consul-telemetry-exporter
    
Will run on port 9320 by default, can be override using the `PORT` env variable

Will use consul host from `CONSUL_HOST` or `HOSTNAME` env variables or the localhost in that order

Will use port 8500 port by default, can be override using the `CONSUL_PORT` env variable
