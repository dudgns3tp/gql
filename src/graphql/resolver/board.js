import boardSchema from '../../model/board.js';
import dayjs from 'dayjs';

const resolvers = {
    Query: {
        boards: async () => await boardSchema.find(),
        board: async (parent, args) => await boardSchema.findOne(args),
        searchBoards: async (parent, args) => {
            const query = {};
            const key = Object.keys(args)[0];
            query[key] = new RegExp(args[key]);
            return await boardSchema.find(query);
        },
    },
    Mutation: {
        addBoard: async (parent, args) =>
            await new boardSchema({ ...args }).save(),
        deleteBoard: async (parent, args) =>
            await boardSchema.findByIdAndDelete(args),
        updateBoard: async (parent, args) => {
            const { _id, ...updateArgs } = args;
            updateArgs.updatedAt = dayjs().format('YYYY-MM-DD hh:mm:ss.SSS');
            return await boardSchema.findByIdAndUpdate(
                _id,
                { $set: updateArgs },
                { new: true }
            );
        },
        addLike: async (parent, args) => {
            return await boardSchema.addLike(args);
        },
        addDislike: async (parent, args) => {
            return await boardSchema.addDislike(args);
        },
    },
};

export default resolvers;
