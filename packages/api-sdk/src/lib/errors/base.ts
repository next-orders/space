import { ErrorGeneral } from '../types/errors';

export class ErrorBase extends Error implements Error, ErrorGeneral {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }
}
