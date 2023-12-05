
import { Complaint } from "@libs/dbmodels/complaint.model";
import { CQuery, ComplaintCreate, GetAllItems, GetItem } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";
import { paginationDecode } from "@libs/api-gateway";
import { SK_CREATED_AT_INDEX } from "@constants/constants";
import { getByIndex } from "@functions/citizen/citizen.service";

export const createComplaintDetails = async (obj: ComplaintCreate) => {
    return await Complaint.put(obj, {
        strictSchemaCheck: true
    });
}
export const getComplaintDetails = async (params: GetItem) => {
    return await Citizen.get({ PK: params.PK, SK: params.SK })
}
export const getAllComplaint = async (pagination?: string, limit?: number, params?: GetAllItems) => {
    const startKey: any = paginationDecode(pagination);
    const query: CQuery = {
        model: Citizen,
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

