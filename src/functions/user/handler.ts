import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';

const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        return response(200, { message: "DONE" });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {

    createUser
}