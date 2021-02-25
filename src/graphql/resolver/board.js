import { boards, setBoards, getBoardsCount, addBoard } from '../../db.js';
import dayjs from 'dayjs';

const resolvers = {
    Query: {
        boards: () => boards,
    },
    Mutation: {
        addBoard: (parent, args) => {
            const board = Object.assign({
                id: getBoardsCount(),
                createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                ...args,
            });
            addBoard(board);

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
    },
};

export default resolvers;
