const AWS = require('aws-sdk');

const options = {};
if(process.env.IS_OFFLINE) {
    options['region'] = 'localhost',
    options['endpoint'] = 'http://localhost:8000'
}

const dynamodb = new AWS.DynamoDB.DocumentClient(options);

const fetchTodos = async (event) => {
    try {
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
