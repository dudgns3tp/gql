import dynamoose from 'dynamoose';

const boardSchema = new dynamoose.Schema(
    {
        id: Number,
        title: String,
        author: String,
        content: String,
    },
    {
        saveUnknown: true,
        timestamps: true,
    }
);

export default dynamoose.model('board', boardSchema);
