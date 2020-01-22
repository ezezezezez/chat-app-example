export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret',
  DB_HOST = 'localhost',
  DB_NAME = 'graphql-chat',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env

export const IN_PROD = NODE_ENV === 'production'

export const REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
}
