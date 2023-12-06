
import { paginationDecode } from "@libs/api-gateway";
import { CQuery, CitizenCreate, GetItem } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";
import { CITIZEN, SK_CREATED_AT_INDEX } from "@constants/constants";

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
export const getAllCitizen = async (pagination?: string, params?: string) => {
    const startKey: any = paginationDecode(pagination);
    const query: CQuery = {
        model: Citizen,
        pk: `${CITIZEN}#${params}`,
        query: {
            index: SK_CREATED_AT_INDEX,
            reverse: true,
            startKey: startKey
        }
    }
    return await getByIndex(query);
}

