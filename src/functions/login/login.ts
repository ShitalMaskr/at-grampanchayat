import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import {  middyfyAuth } from '@libs/lambda';
import { getUserById } from './login.service';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '@constants/env';
const signIn = middyfyAuth(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: { userName: string, password: string } = event.body;
        console.log(event.headers, 'header');
        if (obj.userName && obj.password) {
            const { Item } = await getUserById({ PK: "User#" + obj.userName, SK: "Organization#" + event.headers.host });
            if (Item) {
                if (Item.Password !== obj.password) {
                    return response(400, { message: 'PASSWORD_INVALID' });
                }
                var token = jwt.sign({ userId: Item.PK, SK: Item.SK, roleId: Item.RoleId }, JWT_KEY, {
                    expiresIn: "2d" // 24 hours
                });
                delete Item.Password;
                return response(200, { token, user: Item });
            }
            return response(400, { message: 'USER_NOT_FOUND' });
        }
        return response(400, { message: 'bad request' });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {
    signIn
}