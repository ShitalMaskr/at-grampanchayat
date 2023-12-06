import { handlerPath } from '@libs/handler-resolver';

export const complaint = {
    addComplaint: {
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
    getAllComplaint: {
        handler: `${handlerPath(__dirname)}/handler.getAll`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'complaint/getAll',
                    cors: true,
                },
            },
        ]
    },
};