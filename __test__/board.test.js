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

test('create new Board', async () => {
    const CREATE_NEW_BOARD = gql`
        mutation($title: String!, $author: String!, $content: String!, $label: [label]) {
            addBoard(title: $title, author: $author, content: $content, label: $label) {
                _id
                title
                content
                author
                label
                createdAt
                updatedAt
                seq
                like
            }
        }
    `;
    const {
        data: { addBoard },
    } = await mutate({
        mutation: CREATE_NEW_BOARD,
        variables: {
            title: '테스트 코드로 작성한 게시글 입니다.',
            author: '최영훈',
            content: '테스트중',
            label: ['bug'],
        },
    });
    expect(addBoard).toBeTruthy();
});

test('deleteBoard', async () => {
    const DELETE_BOARD = gql`
        mutation($_id: ID!) {
            deleteBoard(_id: $_id) {
                _id
                title
                author
                content
            }
        }
    `;

    const {
        data: { deleteBoard },
    } = await mutate({
        mutation: DELETE_BOARD,
        variables: {
            _id: '6040436f866bf94d2f992a19',
        },
    });
    expect(deleteBoard).toBeTruthy();
});

test('can not delete board', async () => {
    const DELETE_BOARD = gql`
        mutation($_id: ID!) {
            deleteBoard(_id: $_id) {
                _id
                title
                author
                content
            }
        }
    `;

    const {
        data: { deleteBoard },
    } = await mutate({
        mutation: DELETE_BOARD,
        variables: {
            _id: '603df67b7047418c15bfe2dd',
        },
    });
    expect(deleteBoard).toBeFalsy();
});
