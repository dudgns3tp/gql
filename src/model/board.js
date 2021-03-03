import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import dayjs from 'dayjs';
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

boardSchema.statics.addDislike = async function (_id) {
    return mongoose
        .model('board')
        .findById(_id)
        .then((board) => {
            --board.like;
            return board.save();
        });
};

boardSchema.statics.addLike = async function (_id) {
    return mongoose
        .model('board')
        .findById(_id)
        .then((board) => {
            ++board.like;
            return board.save();
        });
};

boardSchema.statics.getSortedBoards = async function (args) {
    let sortingField;
    const { page, limit, sort } = {
        page: args.page || 1,
        limit: args.limit || 5,
        sort: args.sort || 'seq',
    };
    switch (sort) {
        case 'recent':
            sortingField = Object.assign({ createdAt: 'desc' });
            break;
        case 'like':
            sortingField = Object.assign({ like: 'desc' });
            break;
        case 'seq':
            sortingField = Object.assign({ seq: 'asc' });
            break;
    }

    return await mongoose
        .model('board')
        .find()
        .sort(sortingField)
        .skip((page - 1) * limit)
        .limit(limit);
};

boardSchema.statics.updateBoard = async function (args) {
    const { _id, ...updateArgs } = args;
    Object.assign(updateArgs, {
        updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS'),
    });

    return await mongoose.model('board').findByIdAndUpdate(_id, { $set: updateArgs }, { new: true });
};

boardSchema.statics.searchBoards = async function (args) {
    const { page, limit, sort } = {
        page: args.page || 1,
        limit: args.limit || 5,
        sort: args.sort || 'seq',
    };

    const query = Object.assign({});
    const key = Object.keys(args)[0];
    query[key] = new RegExp(args[key]);
    return await mongoose
        .model('board')
        .find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);
};

boardSchema.statics.searchCount = function (args) {
    const query = Object.assign({});
    const key = Object.keys(args)[0];
    query[key] = new RegExp(args[key]);
    return {
        count: mongoose
            .model('board')
            .find(query)
            .then((boards) => boards.length),
    };
};

boardSchema.statics.getBoardsCount = function () {
    return {
        count: mongoose
            .model('board')
            .find()
            .then((boards) => {
                return boards.length;
            }),
    };
};

boardSchema.plugin(autoIncrement.plugin, {
    model: 'boards',
    field: 'seq',
    startAt: 1,
    increment: 1,
});

export default mongoose.model('board', boardSchema);
