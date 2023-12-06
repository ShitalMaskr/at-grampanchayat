
import { CITIZEN, Employee_Sk, SK_CREATED_AT_INDEX, COMPLAINT } from "@constants/constants";
import { DQuery, GetAllItems } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";
import { Employee } from "@libs/dbmodels/employee.model";
import { Complaint } from "@libs/dbmodels/complaint.model";

export const getByIndex = async ({ model, pk, query }: DQuery) => {
    return await model.query(pk, query);
}

export const getAllCitizenCount = async (params?: GetAllItems) => {
    const query: DQuery = {
        model: Citizen,
        pk: `${CITIZEN}#${params}`,
        query: {
            index: SK_CREATED_AT_INDEX,
            reverse: true,
        }
    }
    return await getByIndex(query);
}
export const getAllEmployeeCount = async (params?: GetAllItems) => {
    const query: DQuery = {
        model: Employee,
        pk: `${Employee_Sk}#${params}`,
        query: {
            index: SK_CREATED_AT_INDEX,
            reverse: true,
        }
    }
    return await getByIndex(query);
}
export const getAllComplaintCount = async (params?: GetAllItems) => {
    const query: DQuery = {
        model: Complaint,
        pk: `${COMPLAINT}#${params}`,
        query: {
            index: SK_CREATED_AT_INDEX,
            reverse: true,
        }
    }
    return await getByIndex(query);
}

