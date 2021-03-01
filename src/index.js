import { ApolloServer } from 'apollo-server';
import queries from './graphql/schema/_queries.js';
import mutations from './graphql/schema/_mutations.js';
import boardTypeDefs from './graphql/schema/board.js';
import boardResolvers from './graphql/resolver/board.js';
import dbConnect from './model/index.js';

const typeDefs = [queries, mutations, boardTypeDefs];

const resolvers = [boardResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    dbConnect();
    console.log(`🚀  Server ready at ${url}`);
});
