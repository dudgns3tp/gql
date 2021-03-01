import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        boards: [Board]
        board(_id: String!): Board
        users: [User]
    }
`;

export default typeDefs;
