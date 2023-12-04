import { handlerPath } from '@libs/handler-resolver';

export const employee = {
    addEmployee: {
        handler: `${handlerPath(__dirname)}/handler.createEmployee`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'addEmployee',
                    cors: true,
                    authorizer: 'aws_iam'
                },
            },
        ]
    },
};