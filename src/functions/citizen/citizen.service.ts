
import { paginationDecode } from "@libs/api-gateway";
import { CQuery, CitizenCreate, GetAllItems, GetItem } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";
import { SK_CREATED_AT_INDEX } from "@constants/constants";

export const getByIndex = async ({ model, pk, query }: CQuery) => {
    return await model.query(pk, query);
}
export const createCitizenDetails = async (obj: CitizenCreate) => {
    return await Citizen.put(obj, {
        strictSchemaCheck: true
    });
}
export const getCitizenDetails = async (params: GetItem) => {
    return await Citizen.get({ PK: params.PK, SK: params.SK })
}
export const updateCitizenDetails = async (obj: CitizenCreate) => {
    return await Citizen.put(obj, {
        strictSchemaCheck: true
    });
}
export const getAllCitizen = async (pagination?: string, limit?: number, params?: GetAllItems) => {
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

