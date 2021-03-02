import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        getBoards(sort: sortingTypes): [Board]
        getBoard(_id: String!): Board
        searchBoards(title: String, author: String, content: String): [Board]
        testBoards: [Board]
    }
`;

export default typeDefs;
