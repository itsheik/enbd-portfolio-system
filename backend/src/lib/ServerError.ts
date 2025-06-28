export class ServerError extends Error {
  public statusCode: number;
  private constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message: string) {
    return new ServerError(message, 400);
  }

  static forbidden(message: string) {
    return new ServerError(message, 403);
  }

  static notFound(message: string) {
    return new ServerError(message, 404);
  }

  static internal(message: string) {
    return new ServerError(message, 500);
  }

  static conflict(message: string) {
    return new ServerError(message, 409);
  }
}
