import { boards, setBoards } from '../../db/boardDB.js';
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
        deleteBoard: async (parent, args) => await boardSchema.deleteOne(args),
        updateBoard: (parent, args) => {
            const UPDATED_ITEM = 0;
            let updated = boards.filter((board) => {
                return board.id === args.id;
            })[UPDATED_ITEM];

            boards
                .filter((board) => board.id === args.id)
                .map((board) => {
                    updated = Object.assign(board, {
                        ...args,
                        updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                    });
                });

            return updated;
        },
    },
};

export default resolvers;
