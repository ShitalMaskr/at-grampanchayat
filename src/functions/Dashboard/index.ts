import { handlerPath } from '@libs/handler-resolver';

export const dashboard = {
    addCitizen: {
        handler: `${handlerPath(__dirname)}/handler.allDashboardDetails`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'dashboard/count',
                    cors: true,
                },
            },
        ]
    },
};