import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'OneTimeEvent',
    Key: {
      EventId: event.pathParameters.id,
    },
	ConditionExpression: "OwnerId = :OwnerId",
    ExpressionAttributeValues: {
      ':OwnerId': event.requestContext.authorizer.claims.sub,
    },
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};