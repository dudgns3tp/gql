import Board from '../../model/board.js';

const resolvers = {
    Query: {
        getBoards: async (_, args) => Board.getSortedBoards(args),
        getBoard: async (_, args) => await Board.findOne(args),
        searchBoards: async (_, args) => Board.searchBoards(args),
        getBoardsCount: async () => Board.getBoardsCount(),
        getSearchCount: async (_, args) => Board.searchCount(args),
    },
    Mutation: {
        addBoard: async (_, args) => await new Board({ ...args }).save(),
        deleteBoard: async (_, args) => await Board.findByIdAndDelete(args),
        updateBoard: async (_, args) => Board.updateBoard(args),
        addLike: async (_, args) => Board.addLike(args),
        addDislike: async (_, args) => Board.addDislike(args),
    },
};

export default resolvers;
