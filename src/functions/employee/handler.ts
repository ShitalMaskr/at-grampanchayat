import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { EmpCreate } from './interface';
import { EMPLOYEE, Employee_Sk } from '@constants/constants';
import { pagination } from '@libs/api-gateway';
import { createEmployeeDetails, getAll, getEmployee, updateEmployeeDetails } from './employee.service';

const createEmployee = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userInformation: any = event.headers["user"];
        // @ts-ignore
        const obj: EmpCreate = event.body;
        const timestamp = Date.now();
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        // @ts-ignore
        obj.PK = `${EMPLOYEE}#${timestamp}`;
        obj.SK = `${EMPLOYEE}#${userInformation.SK}`;
        const employee = await createEmployeeDetails(obj);
        if (employee.$metadata.httpStatusCode == 400) {
            console.error('error getting material =>', employee);
            return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
        }

        return response(200, { message: 'Employee Added Successfully', item: employee });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});
const getEmployeeDetails = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: GetItem = event.queryStringParameters;
        const employeeResponse = await getEmployee({ PK: obj.PK, SK: obj.SK });
        if (employeeResponse.Item) {
            const employeeDetails = employeeResponse.Item;
            return response(200, { message: 'SUCCESS', item: employeeDetails });
        } else {
            return response(400, { message: 'EMPLOYEE_DETAILS_NOT_FOUND' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});

const updateEmployee = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: EmpCreate = event.body;
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        obj.PK = obj.Domain;
        obj.SK = Employee_Sk;
        const employee = await getEmployee({ PK: obj.PK, SK: obj.SK });
        if (employee.Item) {
            const updatedEmployee = await updateEmployeeDetails(obj);
            return response(200, { message: 'Employee Updated Successfully', item: updatedEmployee });
        } else {
            return response(400, { message: 'EMPLOYEE_NOT_FOUND' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});
const getAllEmployee = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const empInformation: any = event.headers["user"];
        const PK: any = `${empInformation.SK}`;
        // const { pagination }: any = event.queryStringParameters;
        const employeeResponse = await getAll( PK, event.queryStringParameters?.pagination );
        if (employeeResponse.Items && employeeResponse.Items.length > 0) {
            return pagination(200, employeeResponse)         
        } else {
            return response(400, { message: 'No Employee Details Found' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});
export {
    createEmployee, getEmployeeDetails, updateEmployee, getAllEmployee

}