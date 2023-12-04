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
};