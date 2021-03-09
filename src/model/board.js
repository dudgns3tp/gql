import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { dateNow } from '../modules/dateNow.js';
import { ApolloError } from 'apollo-server';
import { db as connection } from './index.js';

autoIncrement.initialize(connection);

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
        type: Date,
        default: dateNow(9),
    },
    updatedAt: {
        type: Date,
        default: dateNow(9),
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

boardSchema.statics.sortingTypeMap = new Map()
    .set('recent', { createdAt: 'desc' })
    .set('like', { like: 'desc' })
    .set('seq', { seq: 'asc' });

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

boardSchema.statics.validParameters = function (args) {
    const { title, author, content, isMatched } = args;
    let arr = [];
    const existedParameters = Object.entries({ title, content, author }).filter(
        (it) => it[1] != undefined
    );

    for (let i of existedParameters) {
        switch (i[0]) {
            case 'title':
                arr.push({ title: isMatched === true ? i[1] : new RegExp(i[1]) });
                break;
            case 'author':
                arr.push({ author: isMatched === true ? i[1] : new RegExp(i[1]) });
                break;
            case 'content':
                arr.push({ content: isMatched === true ? i[1] : new RegExp(i[1]) });
                break;
        }
    }
    return arr;
};

boardSchema.statics.searchBoards = function (args) {
    let findQuery = this.find();
    let query;
    const { page, limit, sort, title, author, content, isMatched } = {
        page: args.page || 1,
        limit: args.limit || 5,
        sort: args.sort || 'seq',
        title: args.title,
        author: args.author,
        content: args.content,
        isMatched: args.isMatched || false,
    };

    const sortingField = Object.assign(this.sortingTypeMap.get(sort));
    query = this.validParameters({ title, author, content, isMatched });

    if (title || author || content) {
        findQuery = this.find().and(query);
    }

    return findQuery
        .sort(sortingField)
        .skip((page - 1) * limit)
        .limit(limit)
        .then((boards) => boards)
        .catch(() => {
            throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
        });
};

boardSchema.statics.searchCount = function (args) {
    const { title, author, content, isMatched } = {
        title: args.title,
        author: args.author,
        content: args.content,
        isMatched: args.isMatched || false,
    };
    let query;
    let findQuery = this.find();
    query = this.validParameters({ title, author, content, isMatched });
    if (title || author || content) {
        findQuery = this.find().and(query);
    }

    return {
        count: findQuery
            .then((boards) => boards.length)
            .catch(() => {
                throw new ApolloError('INTERNER SERVER ERROR', 'INTERNER_SERVER_ERROR');
            }),
    };
};

boardSchema.statics.updateBoard = function (args) {
    const { _id, ...updateArgs } = args;

    Object.assign(updateArgs, {
        updatedAt: dateNow(9),
    });

    return this.findByIdAndUpdate(_id, { $set: updateArgs }, { new: true })
        .then((board) => board)
        .catch(() => {
            throw new ApolloError('not found board _id', 'INVALID_ID', {
                parameter: '_id',
            });
        });
};

boardSchema.statics.deleteBoardById = function (args) {
    return this.findByIdAndDelete(args)
        .then((item) => item)
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
