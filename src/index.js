import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import RedisClient from 'ioredis'
import connectRedis from 'connect-redis'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_OPTIONS
} from './config'
import schemaDirectives from './directives'

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    const app = express()

    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)

    const client = new RedisClient(REDIS_OPTIONS)

    const store = new RedisStore({ client })

    app.use(
      session({
        store,
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME),
          sameSite: true,
          secure: IN_PROD
        }
      })
    )

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
