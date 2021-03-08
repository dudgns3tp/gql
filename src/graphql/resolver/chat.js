import { dateNow } from '../../modules/dateNow.js';

const resolvers = {
    Subscription: {
        sendMessage: {
            subscribe: (_, __, { pubSub }) => pubSub.asyncIterator('sendMessage'),
        },
    },
    Mutation: {
        addChat: (_, { message }, { pubSub }) => {
            const time = dateNow();
            pubSub.publish('sendMessage', {
                sendMessage: {
                    message,
                    time,
                },
            });
            return { message, time };
        },
    },
};

export default resolvers;
