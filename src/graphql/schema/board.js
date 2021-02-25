import { gql } from 'apollo-server';

const typeDefs = gql`
    type Board {
        id: Int
        title: String
        content: String
        author: String
        createdAt: String
        updatedAt: String
    }
`;

export default typeDefs;
