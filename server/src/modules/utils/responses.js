/**
 * Reusable HTTP response functions
 *
 * These functions can be passed to `.then` and `.catch`
 */

const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;

  return function(err) {
    res.status(statusCode).send(err);
    return null;
  };
}

const responseWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;
  return (entity) => {
    if (entity) {
      res.status(statusCode).json(entity);
    }

    return null;
  };
}

const handleEntityNotFound = res => (entity) => {
  if (!entity) {
    res.status(404).end();
    return null;
  }

  return entity;
}


module.exports = {
  handleError,
  responseWithResult,
  handleEntityNotFound,
};
