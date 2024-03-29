import { gql } from 'apollo-server';

const typeDefs = gql`
    scalar Date
    type BoardCount {
        count: Int
    }

    type Board {
        _id: ID!
        title: String
        content: String
        author: String
        createdAt: Date
        updatedAt: Date
        label: [label]
        seq: Int
        like: Int
    }

    input BoardInput {
        title: String
        content: String
        author: String
        label: [label]
    }
`;

export default typeDefs;
