import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const response = (statusCode, response: Record<string, unknown>) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response)
  }
}
export const pagination = (statusCode: number, response?: any) => {
  const {
    Items,
    LastEvaluatedKey,
  } = response;
  const payload = {
    items: Items,
    pagination: LastEvaluatedKey ? Buffer.from(JSON.stringify(LastEvaluatedKey)
      .toString(), "utf8")
      .toString('base64') : undefined,
  };
  return {
    statusCode,
    body: JSON.stringify(payload)
  }
}
export const paginationDecode = (pagination: string) => {
  console.log(pagination, "pagination");
  if (pagination) {
    const startKey = Buffer.from(pagination, "base64");
    if (startKey.length > 0) {
      return JSON.parse(startKey.toString("utf8"));
    }
  }

  return undefined;
};
