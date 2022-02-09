const AWS = require('aws-sdk');

const fetchTodos = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const results = await dynamodb
            .scan({ TableName: 'TodoTable' })
            .promise();

        const todos = results.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(todos),
        };
    } catch (err) {
        console.error(err);
        return err;
    }
};

module.exports = {
    handler: fetchTodos,
};
