import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';
import { APIGatewayProxyHandler } from "aws-lambda";

export const middyfy = (handler: APIGatewayProxyHandler) => {
  return middy(handler).before((request: any) => {
    console.log('request ========>', request.event);
  }).use(middyJsonBodyParser())
    .use(httpUrlEncodePathParser())
}

