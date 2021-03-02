import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        getBoards(sort: sortingTypes, page: Int, limit: Int): [Board]
        getBoard(_id: String!): Board
        searchBoards(title: String, author: String, content: String): [Board]
    }
`;

export default typeDefs;
