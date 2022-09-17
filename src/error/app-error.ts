import { log } from './logger';

class AppError extends Error {
  type: any;
  code: number;
  level: any;
  isOperational: boolean;
  time: Date;
  constructor(
    level: any,
    errorType: any,
    errorMessage: string,
    errorCode: number,
    isOperational: boolean
  ) {
    super();
    this.type = errorType;
    this.code = errorCode;
    this.level = level;
    this.message = errorMessage;
    this.isOperational = isOperational;
    this.time = new Date();
    Error.call(this);
    Error.captureStackTrace(this); // TODO study
    log(this.level, this.message, {
      code: this.code,
      type: this.type,
      time: this.time,
      isOperational: this.isOperational,
    });
  }
}
export { AppError };
