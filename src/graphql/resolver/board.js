import { boards, setBoards } from '../../db/boardDB.js';
import boardSchema from '../../model/board.js';
import dayjs from 'dayjs';

const resolvers = {
    Query: {
        boards: () => boards,
        board: (parent, args) =>
            boards.filter((board) => board.id === args.id)[0],
    },
    Mutation: {
        addBoard: async (parent, args) => {
            const board = new boardSchema({
                ...args,
            });
            await board.save();
            return board;
        },
        deleteBoard: (parent, args) => {
            const DELETED_ITEM = 0;
            const deleted = boards.filter((board) => {
                return board.id === args.id;
            })[DELETED_ITEM];
            setBoards(
                boards.filter((board) => {
                    return board.id != args.id;
                })
            );
            return deleted;
        },
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
