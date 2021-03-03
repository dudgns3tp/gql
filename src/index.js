import { ApolloServer } from 'apollo-server';
import dbConnect from './model/index.js';
import resolvers from './graphql/resolver/index.js';
import typeDefs from './graphql/schema/index.js';

const server = new ApolloServer({ typeDefs, resolvers });

dbConnect
    .then(() => {
        console.log('🚀  Mongodb ready');
    })
    .catch((err) => {
        console.log('🧨  Mongodb error', err.console);
    });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
