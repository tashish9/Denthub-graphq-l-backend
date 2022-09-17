import { config } from 'dotenv';

config();
const { PORT, MONGO_URI, SECRET, COMMON_PASSWORD, ENV } = process.env;

const CONSTANTS = {
  PORT,
  ENV,
  MONGO_URI: MONGO_URI || 'mongodb://localhost:27017/denthub-local',
  SECRET,
  COMMON_PASSWORD,
  PUB_SUB_VARS: {
    SIGNIN: 'SIGN_IN',
  },
  ENVIRONMENTS: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
  LOG_LEVELS: {
    INFO: 'info',
    ERROR: 'error',
    DEBUG: 'debug',
  },
  ERROR: {
    BAD_REQUEST: {
      TYPE: 'BAD_REQUEST',
      CODE: 400,
    },
    NOT_FOUND: {
      TYPE: 'NOT_FOUND',
      CODE: 404,
    },
    INTERNAL_SERVER_ERROR: {
      TYPE: 'INTERNAL_SERVER_ERROR',
      CODE: 500,
    },
    UNAUTHORIZED: {
      TYPE: 'UNAUTHORIZED',
      CODE: 403,
    },
    UNAUTHENTICATED: {
      TYPE: 'UNAUTHENTICATED',
      CODE: 401,
    },
  },
};

export { CONSTANTS };
