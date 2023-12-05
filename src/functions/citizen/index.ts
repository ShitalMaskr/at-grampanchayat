import { handlerPath } from '@libs/handler-resolver';

export const citizen = {
    addCitizens: {
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
    getCitizen: {
        handler: `${handlerPath(__dirname)}/handler.getCitizen`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'citizen/getById',
                    cors: true,
                },
            },
        ]
    },
    updateCitizen: {
        handler: `${handlerPath(__dirname)}/handler.updateCitizen`,
        events: [
            {
                http: {
                    method: 'put',
                    path: 'citizen/update',
                    cors: true,
                },
            },
        ]
    },
    getAllCitizen: {
        handler: `${handlerPath(__dirname)}/handler.getAll`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'citizen/getAll',
                    cors: true,
                },
            },
        ]
    },
};