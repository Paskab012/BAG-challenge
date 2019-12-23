/**
 * @exports
 * @class
 */
class HttpError extends Error {
  /**
     *
     * @param {number} statusCode - status code
     * @param {string} message - message for an error
     */
  constructor(statusCode, message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export default HttpError;
