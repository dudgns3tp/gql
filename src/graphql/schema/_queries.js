import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        boards: [Board]
    }
`;

export default typeDefs;
