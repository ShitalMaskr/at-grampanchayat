import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const response = (statusCode, response: Record<string, unknown>) => {
  return {
    statusCode,
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
  const startKey = pagination && Buffer.from(pagination, "base64") || ""
  if (startKey) {
    return JSON.parse(startKey.toString("utf8"));
  }
  return undefined
};