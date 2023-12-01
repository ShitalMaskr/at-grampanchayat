import { handlerPath } from '@libs/handler-resolver';

export const createUser = {
    addUser: {
        handler: `${handlerPath(__dirname)}/handler.createUser`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'user',
                    cors: true,
                    authorizer: 'aws_iam'
                },
            },
        ]
    },
};