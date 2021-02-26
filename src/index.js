import { ApolloServer } from 'apollo-server';
import queries from './graphql/schema/_queries.js';
import mutation from './graphql/schema/_mutations.js';
import boardTypeDefs from './graphql/schema/board.js';
import boardReslovers from './graphql/resolver/board.js';
import userResolvers from './graphql/resolver/user.js';
import userTypeDefs from './graphql/schema/user.js';

const typeDefs = [queries, mutation, boardTypeDefs, userTypeDefs];

const resolvers = [boardReslovers, userResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
