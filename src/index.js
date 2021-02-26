import { ApolloServer } from 'apollo-server';
import queries from './graphql/schema/_queries.js';
import mutations from './graphql/schema/_mutations.js';
import boardTypeDefs from './graphql/schema/board.js';
import boardResolvers from './graphql/resolver/board.js';
import userResolvers from './graphql/resolver/user.js';
import userTypeDefs from './graphql/schema/user.js';

const typeDefs = [queries, mutations, boardTypeDefs, userTypeDefs];

const resolvers = [boardResolvers, userResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
