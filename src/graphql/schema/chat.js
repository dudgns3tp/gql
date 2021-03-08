import { gql } from 'apollo-server';

const typeDefs = gql`
    type Chat {
        message: String
        time: Date
    }
`;

export default typeDefs;
