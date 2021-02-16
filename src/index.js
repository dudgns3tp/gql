const { ApolloServer, gql } = require("apollo-server");

const queries = require("./typedefs-resolvers/_queries");
const mutations = require("./typedefs-resolvers/_mutations");
const equipments = require("./typedefs-resolvers/equipments");
const supplies = require("./typedefs-resolvers/supplies");
const enums = require("./typedefs-resolvers/_enums");
const softwares = require("./typedefs-resolvers/softwares");
const givens = require("./typedefs-resolvers/given");
const tools = require("./typedefs-resolvers/tools");

const typeDefs = [
  queries,
  mutations,
  enums,
  equipments.typeDefs,
  supplies.typeDefs,
  softwares.typeDefs,
  givens.typeDefs,
  tools.typeDefs,
];
const resolvers = [
  equipments.resolvers,
  supplies.resolvers,
  softwares.resolvers,
  givens.resolvers,
  tools.resolvers,
];
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
