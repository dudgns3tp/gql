import {
    boards,
    setBoards,
    getBoardsCount,
    pushBoard,
} from '../../db/boardDB.js';
import dayjs from 'dayjs';

const resolvers = {
    Query: {
        boards: () => boards,
        board: (parent, args) =>
            boards.filter((board) => board.id === args.id)[0],
    },
    Mutation: {
        addBoard: (parent, args) => {
            const board = Object.assign({
                id: getBoardsCount(),
                createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                ...args,
            });
            pushBoard(board);
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
