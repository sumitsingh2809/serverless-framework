const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const result = await dynamodb
            .get({ TableName: 'TodoTable', Key: { id } })
            .promise();

        const todo = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify(todo),
        };
    } catch (err) {
        console.error(err);
        return err;
    }
};

module.exports = {
    handler: fetchTodo,
};
