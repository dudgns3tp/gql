import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        getBoards(sort: sortingTypes, page: Int, limit: Int): [Board]
        getBoard(_id: ID!): Board
        searchBoards(
            title: String
            author: String
            content: String
            page: Int
            limit: Int
            sort: sortingTypes
            isMatched: Boolean
        ): [Board]
        getBoardsCount: BoardCount
        getSearchCount(
            title: String
            author: String
            content: String
            isMatched: Boolean
        ): BoardCount
    }
`;

export default typeDefs;
