import boards from '../../db.js';
import dayjs from 'dayjs';

const resolvers = {
  Query: {
    boards: () => boards,
  },
  Mutation: {
    addBoard: (parent, args) => {
      const board = Object.assign({
        id: boards.length + 1,
        createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
        updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
        ...args,
      });
      boards.push(board);
      return board;
    },
    deleteBoard: (parent, args) => {
      console.log(args);
      const deleted = boards.filter((board) => {
        board.id === args.id;
      })[0];
      console.log(deleted);
      boards.filter((board) => {
        return board.id !== args.id;
      });
      return deleted;
    },
  },
};

export default resolvers;
