// Used to handle the Http Error Events

export class HttpError extends Error {
  constructor(error: Record<string, string>) {
    throw super(
      `[Http Error] StatusCode:${error.statusCode} ApiCode:${error.code} Message:${error.message}`,
    );
  }
}
