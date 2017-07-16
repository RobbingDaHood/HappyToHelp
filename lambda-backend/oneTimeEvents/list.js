import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  const params = {
    TableName: 'OneTimeEvent',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be User Pool sub of the authenticated user
    KeyConditionExpression: 'HashKey = :HashKey',
    ExpressionAttributeValues: {
      ':HashKey': event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call('query', params)
    // Return the matching list of items in response body
    callback(null, success(result.Items))
  } catch (e) {
    callback(null, failure({status: false}))
  }
};
