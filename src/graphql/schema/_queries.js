import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        boards: [Board]
        board(id: Int!): Board
    }
`;

export default typeDefs;
