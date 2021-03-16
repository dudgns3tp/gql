import mongoose from 'mongoose';
import dotenv from 'dotenv';

let db;
export default new Promise((resolve, reject) => {
    dotenv.config();
    mongoose.set('useCreateIndex', true);
    mongoose.connect(`mongodb://localhost:27017/vatech`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    db = mongoose.connection;
    db.on('error', () => {
        reject(console);
    });
    db.once('open', () => {
        resolve(true);
    });
});
export { db };
