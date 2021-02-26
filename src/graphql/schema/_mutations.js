import { gql } from 'apollo-server';

const typeDefs = gql`
    type Mutation {
        addBoard(title: String!, author: String!, content: String!): Board
        deleteBoard(id: Int): Board
        updateBoard(id: Int!, title: String, content: String): Board
    }
`;

export default typeDefs;
