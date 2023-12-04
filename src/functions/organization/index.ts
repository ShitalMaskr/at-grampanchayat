import { handlerPath } from '@libs/handler-resolver';

export const organization = {
    addOrganization: {
        handler: `${handlerPath(__dirname)}/handler.createOrganization`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'addOrganization',
                    cors: true,
                },
            },
        ]
    },
    getOrganization: {
        handler: `${handlerPath(__dirname)}/handler.getOrganizationDetails`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'getOrganization',
                    cors: true,
                },
            },
        ]
    },
    deleteOrganization: {
        handler: `${handlerPath(__dirname)}/handler.deleteOrganizationDetails`,
        events: [
            {
                http: {
                    method: 'delete',
                    path: 'deleteOrganization',
                    cors: true,
                },
            },
        ]
    },
};