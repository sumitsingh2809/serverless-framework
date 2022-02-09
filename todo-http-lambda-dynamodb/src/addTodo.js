const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const options = {};
if(process.env.IS_OFFLINE) {
    options['region'] = 'localhost',
    options['endpoint'] = 'http://localhost:8000'
}

const dynamodb = new AWS.DynamoDB.DocumentClient(options);

const addTodo = async (event) => {
    const { todo } = event.body;
    const createdAt = new Date().toISOString();
    const id = v4();

    const newTodo = {
        id,
        todo,
        createdAt,
        completed: false,
    };

    await dynamodb.put({
        TableName: 'TodoTable',
        Item: newTodo,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newTodo),
    };
};

module.exports = {
    handler: middy(addTodo).use(httpJsonBodyParser()),
};
