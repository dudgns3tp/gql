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
});

boardSchema.plugin(autoIncrement.plugin, {
    model: 'boards',
    field: 'seq',
    startAt: 1,
    increment: 1,
});

export default mongoose.model('board', boardSchema);
