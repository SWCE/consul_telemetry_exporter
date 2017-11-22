function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9:_]/g, '_');
}

module.exports = {
  sanitize
};
