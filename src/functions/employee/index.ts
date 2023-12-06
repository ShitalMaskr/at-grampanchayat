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
 
    updateEmployee: {
        handler: `${handlerPath(__dirname)}/handler.updateEmployee`,
        events: [
            {
                http: {
                    method: 'put',
                    path: 'updateEmployee',
                    cors: true,
                },
            },
        ]
    },
    getEmployee: {
        handler: `${handlerPath(__dirname)}/handler.getemployeeDetail`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'employee/getby-id',
                    cors: true,
                },
            },
        ]
    },
    getAllEmployee: {
        handler: `${handlerPath(__dirname)}/handler.getAllEmployee`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'getAllEmployee',
                    cors: true,
                },
            },
        ]
    },
};

