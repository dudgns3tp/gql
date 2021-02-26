import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
dotenv.config();

// Create new DynamoDB instance
const ddb = new dynamoose.aws.sdk.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

export default dynamoose;
