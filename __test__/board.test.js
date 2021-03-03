/* eslint-disable no-undef */
import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../src/graphql/schema/index.js';
import resolvers from '../src/graphql/resolver/index.js';

const server = new ApolloServer({ typeDefs, resolvers });

const { query, mutate } = createTestClient(server);

test('get board', async () => {
    const GET_BOARD = gql`
        query {
            getBoard(_id: "603df6147047418c15bfe2d7") {
                _id
                author
            }
        }
    `;
    const {
        data: { getBoard },
    } = await query({ query: GET_BOARD });

    expect(getBoard).toEqual({ _id: '603df6147047418c15bfe2d7', author: '최영훈' });
});
