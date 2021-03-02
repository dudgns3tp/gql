import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        boards: [Board]
        board(_id: String!): Board
        searchBoards(title: String, author: String, content: String): [Board]
    }
`;

export default typeDefs;
