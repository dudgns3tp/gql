import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import dayjs from 'dayjs';
import { ApolloError } from 'apollo-server';
import { db as connection } from './index.js';

autoIncrement.initialize(connection);

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
        type: Date,
        default: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS'),
    },
    updatedAt: {
        type: Date,
        default: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS'),
    },
    seq: {
        type: Number,
        default: 0,
    },
    label: [
        {
            type: String,
            required: false,
        },
    ],
    like: {
        type: Number,
        default: 0,
    },
});

boardSchema.statics.addDislike = function (_id) {
    return this.findById(_id)
        .then((board) => {
            --board.like;
            return board.save();
        })
        .catch(() => {
            throw new ApolloError('not found board _id', 'INVALID_ID', {
                parameter: '_id',
            });
        });
};

boardSchema.statics.addLike = function (_id) {
    return this.findById(_id)
        .then((board) => {
            ++board.like;
            return board.save();
        })
        .catch(() => {
            throw new ApolloError('not found board _id', 'INVALID_ID', {
                parameter: '_id',
            });
        });
};

boardSchema.statics.getSortedBoards = function (args) {
    const { page, limit, sort } = {
        page: args.page || 1,
        limit: args.limit || 5,
        sort: args.sort || 'seq',
    };

    const sortingTypeMap = new Map()
        .set('recent', { createdAt: 'desc' })
        .set('like', { like: 'desc' })
        .set('seq', { seq: 'asc' });

    const sortingField = Object.assign(sortingTypeMap.get(sort));

    return this.find()
        .sort(sortingField)
        .skip((page - 1) * limit)
        .limit(limit)
        .then((boards) => boards)
        .catch(() => {
            throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
        });
};

boardSchema.statics.updateBoard = function (args) {
    const { _id, ...updateArgs } = args;

    Object.assign(updateArgs, {
        updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS'),
    });

    return this.findByIdAndUpdate(_id, { $set: updateArgs }, { new: true })
        .then((board) => board)
        .catch(() => {
            throw new ApolloError('not found board _id', 'INVALID_ID', {
                parameter: '_id',
            });
        });
};

boardSchema.statics.searchBoards = function (args) {
    const { page, limit, sort } = {
        page: args.page || 1,
        limit: args.limit || 5,
        sort: args.sort || 'seq',
    };

    const query = Object.assign({});
    const key = Object.keys(args)[0];
    query[key] = new RegExp(args[key]);

    return this.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .then((boards) => boards)
        .catch(() => {
            throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
        });
};

boardSchema.statics.searchCount = function (args) {
    const query = Object.assign({});
    const key = Object.keys(args)[0];
    query[key] = new RegExp(args[key]);

    return {
        count: this.find(query)
            .then((boards) => boards.length)
            .catch(() => {
                throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
            }),
    };
};

boardSchema.statics.getBoardsCount = function () {
    return {
        count: this.find()
            .then((boards) => {
                return boards.length;
            })
            .catch(() => {
                throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
            }),
    };
};

boardSchema.statics.deleteBoardById = function (args) {
    return this.findByIdAndDelete(args)
        .then((item) => {
            return item;
        })
        .catch(() => {
            throw new ApolloError('not Found _id', 'INVALID_ID', {
                parameter: '_id',
            });
        });
};

boardSchema.plugin(autoIncrement.plugin, {
    model: 'boards',
    field: 'seq',
    startAt: 1,
    increment: 1,
});

export default mongoose.model('board', boardSchema);
