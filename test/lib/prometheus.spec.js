const mocha = require('mocha');
const expect = require('expect.js');

const describe = mocha.describe;
const it = mocha.it;

const prometheus = require('../../lib/prometheus');

describe('prometheus test', function () {

  it('should remove dot', function() {
    expect(prometheus.sanitize('.')).to.be('_');
  });

  it('should return consul.dns.ptr_query with node tag', function () {
    expect(prometheus.normalize('consul.dns.ptr_query.a')).to.be.eql({
      name: 'consul.dns.ptr_query',
      labels: {
        node: 'a'
      }
    });
  });

  it('should return consul.raft.replication.appendEntries.rpc with node tag', function () {
    expect(prometheus.normalize('consul.raft.replication.appendEntries.rpc.58deeea6-0cc7-fc76-720f-b187be80f900')).to.be.eql({
      name: 'consul.raft.replication.appendEntries.rpc',
      labels: {
        node: '58deeea6_0cc7_fc76_720f_b187be80f900'
      }
    });
  });

  it('should return consul.raft.replication.appendEntries.logs with node tag', function () {
    expect(prometheus.normalize('consul.raft.replication.appendEntries.logs.58deeea6-0cc7-fc76-720f-b187be80f900')).to.be.eql({
      name: 'consul.raft.replication.appendEntries.logs',
      labels: {
        node: '58deeea6_0cc7_fc76_720f_b187be80f900'
      }
    });
  });

  it('should return consul.raft.replication.heartbeat with node tag', function () {
    expect(prometheus.normalize('consul.raft.replication.heartbeat.58deeea6-0cc7-fc76-720f-b187be80f900')).to.be.eql({
      name: 'consul.raft.replication.heartbeat',
      labels: {
        node: '58deeea6_0cc7_fc76_720f_b187be80f900'
      }
    });
  });

  it('should return consul.dns.domain_query with node tag', function () {
    expect(prometheus.normalize('consul.dns.domain_query.a')).to.be.eql({
      name: 'consul.dns.domain_query',
      labels: {
        node: 'a'
      }
    });
  });

  it('should return consul.http with verb tag and path tag', function () {
    expect(prometheus.normalize('consul.http.GET.v1.agent.metrics')).to.be.eql({
      name: 'consul.http',
      labels: {
        verb: 'GET',
        path: 'v1_agent_metrics',
      }
    });
  });

  it('should return consul.fsm.acl with op tag', function () {
    expect(prometheus.normalize('consul.fsm.acl.a')).to.be.eql({
      name: 'consul.fsm.acl',
      labels: {
        op: 'a'
      }
    });
  });

  it('should return consul.fsm.session with op tag', function () {
    expect(prometheus.normalize('consul.fsm.session.a')).to.be.eql({
      name: 'consul.fsm.session',
      labels: {
        op: 'a'
      }
    });
  });

  it('should return consul.fsm.kvs with op tag', function () {
    expect(prometheus.normalize('consul.fsm.kvs.a')).to.be.eql({
      name: 'consul.fsm.kvs',
      labels: {
        op: 'a'
      }
    });
  });

  it('should return consul.fsm.tombstone with op tag', function () {
    expect(prometheus.normalize('consul.fsm.tombstone.a')).to.be.eql({
      name: 'consul.fsm.tombstone',
      labels: {
        op: 'a'
      }
    });
  });

  it('should return consul.fsm.prepared-query with op tag', function () {
    expect(prometheus.normalize('consul.fsm.prepared-query.a')).to.be.eql({
      name: 'consul.fsm.prepared-query',
      labels: {
        op: 'a'
      }
    });
  });

  it('should return consul.catalog.service.query with service tag', function () {
    expect(prometheus.normalize('consul.catalog.service.query.a')).to.be.eql({
      name: 'consul.catalog.service.query',
      labels: {
        service: 'a'
      }
    });
  });

  it('should return consul.catalog.service.query-tag with service tag and tag tag', function () {
    expect(prometheus.normalize('consul.catalog.service.query-tag.a.b')).to.be.eql({
      name: 'consul.catalog.service.query-tag',
      labels: {
        service: 'a',
        tag: 'b'
      }
    });
  });

  it('should return consul.catalog.service.not-found with service tag', function () {
    expect(prometheus.normalize('consul.catalog.service.not-found.a')).to.be.eql({
      name: 'consul.catalog.service.not-found',
      labels: {
        service: 'a'
      }
    });
  });

  it('should return consul.health.service.query with service tag', function () {
    expect(prometheus.normalize('consul.health.service.query.a')).to.be.eql({
      name: 'consul.health.service.query',
      labels: {
        service: 'a'
      }
    });
  });

  it('should return consul.health.service.query-tag with service tag and tag tag', function () {
    expect(prometheus.normalize('consul.health.service.query-tag.a.b')).to.be.eql({
      name: 'consul.health.service.query-tag',
      labels: {
        service: 'a',
        tag: 'b'
      }
    });
  });

  it('should return consul.health.service.not-found with service tag', function () {
    expect(prometheus.normalize('consul.health.service.not-found.a')).to.be.eql({
      name: 'consul.health.service.not-found',
      labels: {
        service: 'a'
      }
    });
  });

  it('should return single consul prefix', function () {
    expect(prometheus.normalize('consul.consul.health.service')).to.be.eql({
      name: 'consul.health.service',
      labels: {}
    });
  });

});
