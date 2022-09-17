import { AppError } from './app-error';
import { CONSTANTS } from '../config';
const { ERROR, LOG_LEVELS } = CONSTANTS;

const throwUnAuthenticatedError = (message: string, isOperational = true) => {
  throw new AppError(
    LOG_LEVELS.ERROR,
    ERROR.UNAUTHENTICATED.TYPE,
    message,
    ERROR.UNAUTHENTICATED.CODE,
    isOperational
  );
};

const throwBadRequestError = (message: string, isOperational = true) => {
  throw new AppError(
    LOG_LEVELS.ERROR,
    ERROR.BAD_REQUEST.TYPE,
    message,
    ERROR.BAD_REQUEST.CODE,
    isOperational
  );
};

const throwNotFoundError = (message: string, isOperational = true) => {
  throw new AppError(
    LOG_LEVELS.ERROR,
    ERROR.NOT_FOUND.TYPE,
    message,
    ERROR.NOT_FOUND.CODE,
    isOperational
  );
};

const throwUnAuthorizedError = (message: string, isOperational = true) => {
  throw new AppError(
    LOG_LEVELS.ERROR,
    ERROR.UNAUTHORIZED.TYPE,
    message,
    ERROR.UNAUTHORIZED.CODE,
    isOperational
  );
};

const throwInternalServerError = (message: string, isOperational = true) => {
  throw new AppError(
    LOG_LEVELS.ERROR,
    ERROR.INTERNAL_SERVER_ERROR.TYPE,
    message,
    ERROR.INTERNAL_SERVER_ERROR.CODE,
    isOperational
  );
};

export {
  throwBadRequestError,
  throwInternalServerError,
  throwUnAuthenticatedError,
  throwUnAuthorizedError,
  throwNotFoundError,
};
