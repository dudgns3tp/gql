import { gql } from 'apollo-server';

const typeDefs = gql`
    type Subscription {
        sendMessage: Chat
    }
`;

export default typeDefs;
