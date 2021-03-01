import { gql } from 'apollo-server';

const typeDefs = gql`
    type Mutation {
        addBoard(title: String!, author: String!, content: String!): Board
        deleteBoard(_id: String): Board
        updateBoard(_id: String!, title: String, content: String): Board
    }
`;

export default typeDefs;
