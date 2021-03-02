import boardSchema from '../../model/board.js';
import dayjs from 'dayjs';

const resolvers = {
    Query: {
        getBoards: async (_, args) =>
            await boardSchema.getSortedBoards(args.sort || 'recent'),
        getBoard: async (_, args) => await boardSchema.findOne(args),
        searchBoards: async (_, args) => {
            const query = {};
            const key = Object.keys(args)[0];
            query[key] = new RegExp(args[key]);
            return await boardSchema.find(query);
        },
    },
    Mutation: {
        addBoard: async (_, args) => await new boardSchema({ ...args }).save(),
        deleteBoard: async (_, args) =>
            await boardSchema.findByIdAndDelete(args),
        updateBoard: async (_, args) => {
            const { _id, ...updateArgs } = args;
            updateArgs.updatedAt = dayjs().format('YYYY-MM-DD hh:mm:ss.SSS');
            return await boardSchema.findByIdAndUpdate(
                _id,
                { $set: updateArgs },
                { new: true }
            );
        },
        addLike: async (parent, args) => await boardSchema.addLike(args),
        addDislike: async (parent, args) => await boardSchema.addDislike(args),
    },
};

export default resolvers;
