
import { Complaint } from "@libs/dbmodels/complaint.model";
import { ComplaintCreate, GetItem } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";

export const createComplaintDetails = async (obj: ComplaintCreate) => {
    return await Complaint.put(obj, {
        strictSchemaCheck: true
    });
}
export const getComplaintDetails = async (params: GetItem) => {
    return await Citizen.get({ PK: params.PK, SK: params.SK })
}

