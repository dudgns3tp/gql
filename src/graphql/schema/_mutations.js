import { gql } from 'apollo-server';

const typeDefs = gql`
  type Mutation {
    addBoard(title: String, author: String, content: String): Board
    deleteBoard(id: Int): Board
  }
`;

export default typeDefs;
