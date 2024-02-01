// ApplicationError class extending the standard Error class
export class ApplicationError extends Error {
  // Constructor to initialize the error message and code
  constructor(message, code) {
    super(message);
    // Setting the error code
    this.code = code;
  }
}
