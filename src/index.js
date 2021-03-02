import { ApolloServer } from 'apollo-server';
import queries from './graphql/schema/_queries.js';
import mutations from './graphql/schema/_mutations.js';
import boardTypeDefs from './graphql/schema/board.js';
import boardResolvers from './graphql/resolver/board.js';
import dbConnect from './model/index.js';

const typeDefs = [queries, mutations, boardTypeDefs];

const resolvers = [boardResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

dbConnect
    .then(() => {
        console.log('🚀  Mongodb ready');
    })
    .catch((err) => {
        console.log('🚀  Mongodb error', err);
    });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
