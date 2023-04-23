/** Options:
*  @param status > Http Status Code [mandatory]
*  @param title > Human-Readable Error Title [mandatory]
*  @param source > { parameter: } -> parameter which caused an error [optional]
*/

const createErrorObject = (options) => {
  const errorObject = {
    status: options.status,
    title: options.title,
  };

  const source = options.source || null;

  if (source) {
    errorObject.source = { parameter: source.parameter || undefined };
  }

  return errorObject;
};

module.exports = createErrorObject;
