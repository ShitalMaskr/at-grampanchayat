
import { EmpCreate, GetItem } from "./interface";
import { Employee } from "@libs/dbmodels/employee.model";


export const createEmployeeDetails = async (obj: EmpCreate) => {
    return await Employee.put(obj, {
        strictSchemaCheck: true
    });
}


export const getEmployee = async (params: GetItem) => {
    return await Employee.get({ PK: params.PK, SK: params.SK })
}

