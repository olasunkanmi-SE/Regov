export class HttpException extends Error {
  status: number;
  error: {};
  constructor(status: number, message: string, error?: {}) {
    super(message);
    this.status = status;
    this.error = error;
  }
}
