import { JWT_KEY } from "@constants/env";
import middy from "@middy/core";
// import httpErrorHandler from "@middy/http-error-handler";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';
import { APIGatewayProxyHandler } from "aws-lambda";
import jwt from 'jsonwebtoken';
export const middyfy = (handler: APIGatewayProxyHandler) => {
  return middy(handler).before((request: any) => {
    // console.log('request ========>', request.event);
  }).use(new TokenValidationMiddleware())
    .use(middyJsonBodyParser())
    .use(httpUrlEncodePathParser())
}

export const middyfyAuth = (handler: APIGatewayProxyHandler) => {
  return middy(handler).before((request: any) => {
    // console.log('request ========>', request.event);
  })
    .use(middyJsonBodyParser())
    .use(httpUrlEncodePathParser())
}

export class TokenValidationMiddleware implements middy.MiddlewareObj<any, any> {
  public constructor() {
    this.before = this.before.bind(this);
  }
  public async before(request: any): Promise<void> {
    try {
      const token = request?.event?.headers?.Authorization;
      const accessTokenSecret: jwt.Secret = String(JWT_KEY);
      console.log(accessTokenSecret,'accessTokenSecret')
      jwt.verify(token, accessTokenSecret, async (err: any, decoded: any) => {
        if (err) {
          request.response = {
            statusCode: 401,
            body: JSON.stringify({
              code: 'unauthorized',
              message: 'Missing, invalid or expired access token',
            }),
          };
        } else {
          request.event.headers["user"] = decoded;
        }
      });
    } catch (e) {
      request.response = {
        statusCode: 401,
        body: JSON.stringify({
          code: 'unauthorized',
          message: 'Missing, invalid or expired access token',
        }),
      };
    }
  }
}