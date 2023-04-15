const userParamCheck = (req, res, next) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).send('Name missing.');
  }

  return next();
};

module.exports = userParamCheck;
