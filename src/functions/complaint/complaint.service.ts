
import { Complaint } from "@libs/dbmodels/complaint.model";
import { CQuery, ComplaintCreate, GetItem } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";
import { paginationDecode } from "@libs/api-gateway";
import { COMPLAINT, SK_CREATED_AT_INDEX } from "@constants/constants";
import { getByIndex } from "@functions/citizen/citizen.service";

export const createComplaintDetails = async (obj: ComplaintCreate) => {
    return await Complaint.put(obj, {
        strictSchemaCheck: true
    });
}
export const getComplaintDetails = async (params: GetItem) => {
    return await Citizen.get({ PK: params.PK, SK: params.SK })
}
export const getAllComplaint = async (pagination?: string, params?: string) => {
    const startKey: any = paginationDecode(pagination);
    const query: CQuery = {
        model: Citizen,
        pk: `${COMPLAINT}#${params}`,
        query: {
            index: SK_CREATED_AT_INDEX,
            reverse: true,
            startKey: startKey
        }
    }
    return await getByIndex(query);
}

