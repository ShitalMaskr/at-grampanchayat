
import { CitizenCreate, GetItem } from "./interface";
import { Citizen } from "@libs/dbmodels/citizen.model";


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


