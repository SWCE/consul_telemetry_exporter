module.exports = {
  sanitize,
  normalize
};

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9:_]/g, '_');
}

function normalize(name) {
  let normalizedName = name;
  const labels = {};

  /**
   * handling the following metrics patterns:
   * consul.dns.ptr_query.<node>
   * consul.dns.domain_query.<node>
   * consul.raft.replication.appendEntries.logs.<node>
   * consul.raft.replication.appendEntries.rpc.<node>
   * consul.raft.replication.heartbeat.<node>
   * @type {RegExp}
   */
  const $1 = new RegExp('(consul.(?:dns.(?:ptr_query|domain_query)|raft.replication.(?:appendEntries.(?:logs|rpc)|heartbeat)))[.](.*)');
  if ($1.test(normalizedName)) {
    const match = $1.exec(normalizedName);
    normalizedName = match[1];
    labels.node = sanitize(match[2]);
  }

  /**
   * handling the following metrics patterns:
   * consul.http.<verb>.<path>
   * @type {RegExp}
   */
  const $2 = new RegExp('(consul.http)[.]([^.]*)[.](.*)');
  if ($2.test(normalizedName)) {
    const match = $2.exec(normalizedName);
    normalizedName = match[1];
    labels.verb = sanitize(match[2]);
    labels.path = sanitize(match[3]);
  }

  /**
   * handling the following metrics patterns:
   * consul.fsm.acl.<op>
   * consul.fsm.session.<op>
   * consul.fsm.kvs.<op>
   * consul.fsm.tombstone.<op>
   * consul.fsm.prepared-query.<op>
   * @type {RegExp}
   */
  const $3 = new RegExp('(consul.fsm.(?:acl|session|kvs|tombstone|prepared-query))[.](.*)');
  if ($3.test(normalizedName)) {
    const match = $3.exec(normalizedName);
    normalizedName = match[1];
    labels.op = sanitize(match[2]);
  }

  /**
   * handling the following metrics patterns:
   * consul.catalog.service.query.<service>
   * consul.catalog.service.not-found.<service>
   * consul.health.service.query.<service>
   * consul.health.service.not-found.<service>
   * @type {RegExp}
   */
  const $4 = new RegExp('(consul.(?:catalog|health).service.(?:query|not-found))[.](.*)');
  if ($4.test(normalizedName)) {
    const match = $4.exec(normalizedName);
    normalizedName = match[1];
    labels.service = sanitize(match[2]);
  }

  /**
   * handling the following metrics patterns:
   * consul.catalog.service.query-tag.<service>.<tag>
   * consul.health.service.query-tag.<service>.<tag>
   * @type {RegExp}
   */
  const $5 = new RegExp('(consul.(?:catalog|health).service.query-tag)[.]([^.]*)[.](.*)');
  if ($5.test(normalizedName)) {
    const match = $5.exec(normalizedName);
    normalizedName = match[1];
    labels.service = sanitize(match[2]);
    labels.tag = sanitize(match[3]);
  }

  /**
   * handling the following metrics patterns:
   * consul.consul.* - in order to remove the duplication
   * @type {RegExp}
   */
  const $6 = new RegExp('consul[.](consul.*)');
  if ($6.test(normalizedName)) {
    const match = $6.exec(normalizedName);
    normalizedName = match[1];
  }

  return {
    name: normalizedName,
    labels: labels
  };
}
