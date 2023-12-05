import { handlerPath } from '@libs/handler-resolver';

export const complaint = {
    addCitizen: {
        handler: `${handlerPath(__dirname)}/handler.createComplaint`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'complaint/addComplaint',
                    cors: true,
                },
            },
        ]
    },
    getComplaint: {
        handler: `${handlerPath(__dirname)}/handler.getComplaint`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'complaint/get',
                    cors: true,
                },
            },
        ]
    },
};