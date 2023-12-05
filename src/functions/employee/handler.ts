import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { EmpCreate } from './interface';
import {  Employee_Sk } from '@constants/constants';
import { createEmployeeDetails, getEmployee } from './employee.service';

const createEmployee = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: EmpCreate = event.body;
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_EMPLOYEE_NOT_ADDED' });
        }

        obj.PK = obj.Domain;
        obj.SK = Employee_Sk;
        console.log({ PK: obj.PK, SK: obj.SK }, '{ PK: obj.PK, SK: obj.SK }');

        const emp = await getEmployee({ PK: obj.PK, SK: obj.SK });
        console.log(emp,'empemp')
        console.log(emp,"vvvv")
        if (!emp.Item) {
            await createEmployeeDetails({
                PK: `Employee#${obj.Email}`,
                SK: `${Employee_Sk}#${obj.PK}`,
                Email: obj.Email,
                Name: obj.Name,
                Domain: obj.Domain,
                PhoneNumber:obj.PhoneNumber,
                Address:obj.Address,
                DOB:obj.DOB,
                JoiningDate:obj.JoiningDate,
                PAN:obj.PAN,
                Aadhar:obj.Aadhar,
               
            })
            const employee = await createEmployeeDetails(obj);
            console.log(employee, "userDetails")
            if (employee.$metadata.httpStatusCode == 400) {
                console.error('error getting material =>', employee);
                return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
            }
            return response(200, { message: 'SUCCESS', item: employee });
        }
        return response(400, { message: 'EMPLOYEE_ALREADY_EXISTED' });

    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {
    createEmployee

}