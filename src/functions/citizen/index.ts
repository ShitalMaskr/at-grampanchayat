import { handlerPath } from '@libs/handler-resolver';

export const citizen = {
    addCitizen: {
        handler: `${handlerPath(__dirname)}/handler.createCitizen`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'citizen/addCitizen',
                    cors: true,
                },
            },
        ]
    },
};