import { handlerPath } from '@libs/handler-resolver';

export const inquiry = {
    addInquiry: {
        handler: `${handlerPath(__dirname)}/addInquiryHandler.addInquiry`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'inquiries',
                    cors: true,
                    authorizer: 'aws_iam'
                },
            },
        ]
    },
    getInquiry: {
        handler: `${handlerPath(__dirname)}/inquiryReadHandler.getInquiry`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'inquiries/{pk}/{sk}',
                    cors: true,
                    authorizer: 'aws_iam'
                },
            },
        ]
    }
};