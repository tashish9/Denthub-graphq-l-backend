import { AppError } from './app-error';
import { log } from './logger';

import {
  throwBadRequestError,
  throwInternalServerError,
  throwUnAuthenticatedError,
  throwUnAuthorizedError,
  throwNotFoundError,
} from './methods';

export {
  AppError,
  log,
  throwBadRequestError, // data required for req isn't present/enough
  throwInternalServerError,
  throwUnAuthenticatedError,
  throwUnAuthorizedError,
  throwNotFoundError,
};

// 3xx -> redirection
// 4xx -> client
// 5xx -> server
