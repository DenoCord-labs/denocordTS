// Used to handle the Http Error Events

export class HttpError {
  constructor(error: Record<string, string>) {
    throw new Error(
      `[Http Error]  Message:${error.message}`,
    );
  }
}
