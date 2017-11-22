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

  const $1 = new RegExp('(consul.(?:dns.(?:ptr_query|domain_query)|raft.replication.(?:appendEntries.(?:logs|rpc)|heartbeat)))[.](.*)');
  if ($1.test(normalizedName)) {
    const match = $1.exec(normalizedName);
    normalizedName = match[1];
    labels.node = sanitize(match[2]);
  }

  const $2 = new RegExp('(consul.http)[.]([^.]*)[.](.*)');
  if ($2.test(normalizedName)) {
    const match = $2.exec(normalizedName);
    normalizedName = match[1];
    labels.verb = sanitize(match[2]);
    labels.path = sanitize(match[3]);
  }

  const $3 = new RegExp('(consul.fsm.(?:acl|session|kvs|tombstone|prepared-query))[.](.*)');
  if ($3.test(normalizedName)) {
    const match = $3.exec(normalizedName);
    normalizedName = match[1];
    labels.op = sanitize(match[2]);
  }

  const $4 = new RegExp('(consul.(?:catalog|health).service.(?:query|not-found))[.](.*)');
  if ($4.test(normalizedName)) {
    const match = $4.exec(normalizedName);
    normalizedName = match[1];
    labels.service = sanitize(match[2]);
  }

  const $5 = new RegExp('(consul.(?:catalog|health).service.query-tag)[.]([^.]*)[.](.*)');
  if ($5.test(normalizedName)) {
    const match = $5.exec(normalizedName);
    normalizedName = match[1];
    labels.service = sanitize(match[2]);
    labels.tag = sanitize(match[3]);
  }

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
