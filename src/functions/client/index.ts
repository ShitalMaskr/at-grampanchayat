import { handlerPath } from '@libs/handler-resolver';

export const client = {
    getClientMetricUtilization: {
        handler: `${handlerPath(__dirname)}/handler.getClientMetricUtilization`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'client/metric-utilization/{pk}',
                    cors: true,
                    authorizer: 'aws_iam'
                },
            },
        ]
    },
}