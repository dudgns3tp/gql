import Board from '../../model/board.js';

const resolvers = {
    Query: {
        getBoards: async (_, args) => {
            const pageOptions = {
                page: args.page || 0,
                limit: args.limit || 5,
                sort: args.sort || 'seq',
            };
            return await Board.getSortedBoards(pageOptions);
        },
        getBoard: async (_, args) => await Board.findOne(args),
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
