import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
    }
`;

export default typeDefs;
