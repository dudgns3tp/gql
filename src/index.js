import { ApolloServer } from 'apollo-server';
import queries from './graphql/schema/_queries.js';
import mutation from './graphql/schema/_mutations.js';
import boardTypeDefs from './graphql/schema/board.js';
import boardReslovers from './graphql/resolver/board.js';

const typeDefs = [queries, mutation, boardTypeDefs];

const resolvers = [boardReslovers];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
