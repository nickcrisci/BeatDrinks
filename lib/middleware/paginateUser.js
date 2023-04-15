const createErrorObject = require('../modules/createErrorObject');

const paginateUser = (req, res, next) => {
  const page = req.query.page || null;
  const users = req.users || [];
  const userLength = users.length || 1;
  const pageSize = 5;

  if (!page) {
    return next();
  }

  if (page < 1) {
    const error = createErrorObject({ status: 400, title: 'Bad Request', source: { parameter: 'page' } });
    return res.status(400).send(error);
  }

  if (userLength < 2) {
    return next();
  }

  // Slices the list into the chunk corresponding to the page query
  req.users = users.slice(pageSize * (page - 1), page * pageSize);

  return next();
};

module.exports = paginateUser;
