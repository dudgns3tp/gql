import { ApolloServer, PubSub } from 'apollo-server';
import dbConnect from './model/index.js';
import resolvers from './graphql/resolver/index.js';
import typeDefs from './graphql/schema/index.js';
import subscriptions from './graphql/subscription/index.js';
import formatError from './graphql/formatError.js';

const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions,
    context: { pubSub },
    formatError,
    debug: false,
});

dbConnect
    .then(() => console.log('🚀  Mongodb is ready'))
    .catch((err) => console.log('🧨  Mongodb error', err.console));

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
