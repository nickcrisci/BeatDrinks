const limitUser = (req, res, next) => {
  const users = req.users || [];
  const userLength = users.length || 1;
  const limit = req.query.limit || null;

  if (limit) {
    if (limit > userLength || userLength < 2) {
      return next();
    }

    req.users = users.slice(0, limit);
  }
  return next();
};

module.exports = limitUser;
