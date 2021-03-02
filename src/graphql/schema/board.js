import { gql } from 'apollo-server';

const typeDefs = gql`
    scalar Date
    type Board {
        _id: String
        title: String
        content: String
        author: String
        createdAt: Date
        updatedAt: Date
        label: [label]
        seq: Int
        like: Int
    }
`;

export default typeDefs;
