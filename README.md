# Consul Telemetry Exporter
Prometheus exporter for [consul telemetry metrics](https://www.consul.io/docs/agent/telemetry.html).

Any reported metric on the [metrica endpoint](https://www.consul.io/api/agent.html#view-metrics) will be exposed.

## Installation

    $ npm install -g consul_telemetry_exporter

## running

    $ consul_telemetry_exporter

will run on port 7569 by default, can be override using the PORT env variable
