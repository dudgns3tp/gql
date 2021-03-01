import boardSchema from '../../model/board.js';
import dayjs from 'dayjs';

const resolvers = {
    Query: {
        boards: async () => await boardSchema.find(),
        board: async (parent, args) => await boardSchema.findOne(args),
    },
    Mutation: {
        addBoard: async (parent, args) => {
            const board = new boardSchema({
                ...args,
            });
            await board.save();
            return board;
        },
        deleteBoard: async (parent, args) =>
            await boardSchema.findByIdAndDelete(args),
        updateBoard: async (parent, args) => {
            const { _id, ...updateArgs } = args;
            updateArgs.updatedAt = dayjs().format('YYYY-MM-DD hh:mm:ss');
            return await boardSchema.findByIdAndUpdate(
                _id,
                { $set: updateArgs },
                { new: true }
            );
        },
    },
};

export default resolvers;