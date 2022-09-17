import { httpServer } from './server';
import { app } from './app';
import { CONSTANTS } from './config';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './modules';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { dataLoader } from './modules';
import { PubSub } from 'graphql-subscriptions';
import { typeDefs } from './modules';

const pubsub = new PubSub();
const { PORT } = CONSTANTS;

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const serverCleanup = useServer({ schema }, wsServer);

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        token: req.headers.authorization,
        ...dataLoader,
        pubsub,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startApolloServer();
// FIXME info && graphql-fields for further improvement
