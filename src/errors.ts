export class NotImplementedError extends Error {
  constructor(cause?: string) {
    super('Functionality not already implemented.', { cause });
    this.name = 'NotImplementedError';
  }
}
