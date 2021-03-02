import { gql } from 'apollo-server';

const typeDefs = gql`
    type Mutation {
        addBoard(
            title: String!
            author: String!
            content: String!
            label: [label]
        ): Board
        deleteBoard(_id: String): Board
        updateBoard(
            _id: String!
            title: String
            content: String
            label: [label]
        ): Board
        addLike(_id: String): Board
    }
`;

export default typeDefs;
