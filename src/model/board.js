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

boardSchema.statics.addLike = async function (_id) {
    return mongoose
        .model('board')
        .findById(_id)
        .then((board) => {
            ++board.like;
            return board.save();
        });
};

boardSchema.statics.addDislike = async function (_id) {
    return mongoose
        .model('board')
        .findById(_id)
        .then((board) => {
            --board.like;
            return board.save();
        });
};

boardSchema.statics.getSortedBoards = async function (args) {
    let sortingField;
    const { sort, page, limit } = args;
    switch (sort) {
        case 'recent':
            sortingField = Object.assign({ createdAt: 'desc' });
            break;
        case 'like':
            sortingField = Object.assign({ like: 'desc' });
            break;
        case 'seq':
            sortingField = Object.assign({ seq: 'asc' });
    }

    return await mongoose
        .model('board')
        .find()
        .sort(sortingField)
        .skip(page * limit)
        .limit(limit);
};

boardSchema.statics.updateBoard = async function (args) {
    const { _id, ...updateArgs } = args;
    Object.assign(updateArgs, {
        updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS'),
    });

    return await mongoose
        .model('board')
        .findByIdAndUpdate(_id, { $set: updateArgs }, { new: true });
};

boardSchema.statics.searchBoards = async function (args) {
    const query = Object.assign({});
    const key = Object.keys(args)[0];
    query[key] = new RegExp(args[key]);
    return await mongoose.model('board').find(query);
};

boardSchema.plugin(autoIncrement.plugin, {
    model: 'boards',
    field: 'seq',
    startAt: 1,
    increment: 1,
});

export default mongoose.model('board', boardSchema);
