
import { paginationDecode } from "@libs/api-gateway";
import { CQuery, EmpCreate, GetAllItems, GetItem } from "./interface";
import { Employee } from "@libs/dbmodels/employee.model";
import { SK_CREATED_AT_INDEX } from "@constants/constants";

export const getByIndex = async ({ model, pk, query }: CQuery) => {
    return await model.query(pk, query);
}
export const createEmployeeDetails = async (obj: EmpCreate) => {
    return await Employee.put(obj, {
        strictSchemaCheck: true
    });
}

export const getEmployee = async (params: GetItem) => {
    return await Employee.get({ PK: params.PK, SK: params.SK })
}
export const updateEmployeeDetails = async (obj: EmpCreate) => {
    return await Employee.put(obj, {
        strictSchemaCheck: true
    });
}
export const getAll = async (pagination?: string, limit?: number, params?: GetAllItems) => {
    const startKey: any = paginationDecode(pagination);
    console.log(pagination, limit, params.PK)
    const query: CQuery = {
        model: Employee,
        pk: params.PK,
        query: {
            index: SK_CREATED_AT_INDEX,
            limit: Number(limit) || 50,
            reverse: true,
            startKey: startKey
        }
    }
    return await getByIndex(query);
}