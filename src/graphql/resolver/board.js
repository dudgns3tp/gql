import Board from '../../model/board.js';

const resolvers = {
    Query: {
        getBoards: (_, args) => Board.getSortedBoards(args),
        getBoard: async (_, args) => await Board.findOne(args),
        searchBoards: (_, args) => Board.searchBoards(args),
        getBoardsCount: () => Board.getBoardsCount(),
        getSearchCount: (_, args) => Board.searchCount(args),
    },
    Mutation: {
        addBoard: async (_, args) => await new Board({ ...args }).save(),
        addInputBoard: async (_, args) => await new Board({ ...args.input }).save(),
        deleteBoard: (_, args) => Board.deleteBoardById(args),
        updateBoard: (_, args) => Board.updateBoard(args),
        addLike: (_, args) => Board.addLike(args),
        addDislike: (_, args) => Board.addDislike(args),
    },
};

export default resolvers;
