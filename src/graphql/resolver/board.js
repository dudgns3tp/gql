import Board from '../../model/board.js';

const resolvers = {
    Query: {
        getBoards: async (_, args) => {
            return await Board.getSortedBoards(args);
        },
        getBoard: async (_, args) => await Board.findOne(args),
        testBoards: async () => {
            return await Board.find().sort({ like: 'desc' });
        },
        searchBoards: async (_, args) => await Board.searchBoards(args),
    },
    Mutation: {
        addBoard: async (_, args) => await new Board({ ...args }).save(),
        deleteBoard: async (_, args) => await Board.findByIdAndDelete(args),
        updateBoard: async (_, args) => await Board.updateBoard(args),
        addLike: async (_, args) => await Board.addLike(args),
        addDislike: async (_, args) => await Board.addDislike(args),
    },
};

export default resolvers;
