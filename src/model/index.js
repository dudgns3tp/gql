import mongoose from 'mongoose';
import dotenv from 'dotenv';

export default function () {
    dotenv.config();
    mongoose.connect(
        `mongodb+srv://ridiServer:${process.env.mongodb_pw}@cluster0.kcu9a.mongodb.net/test`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('데이터베이스 연결 성공.');
    });
}
