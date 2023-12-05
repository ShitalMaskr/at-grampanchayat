
import { User } from "@libs/dbmodels/user.model";
import { GetAllItems, GetItem, OrgCreate, Orgquery, UserCreate } from "./interface";
import { Organization } from "@libs/dbmodels/organization.model";
import { paginationDecode } from "@libs/api-gateway";
import { SK_CREATED_AT_INDEX } from "@constants/constants";
import { getByIndex } from "@functions/citizen/citizen.service";


export const createOrganizationDetails = async (obj: OrgCreate) => {
    return await Organization.put(obj, {
        strictSchemaCheck: true
    });
}
export const getOrganization = async (params: GetItem) => {
    return await Organization.get({ PK: params.PK, SK: params.SK })
}

export const deleteOrganization = async (params: GetItem) => {
    return await Organization.delete({ PK: params.PK, SK: params.SK })
}
export const createUser = async (obj: UserCreate) => {
    return await User.put(obj, {
        strictSchemaCheck: true
    });
}
export const updateOrganizationDetails = async (obj: OrgCreate) => {
    return await Organization.put(obj, {
        strictSchemaCheck: true
    });
}
export const getAllOrganization = async (pagination?: string, limit?: number, params?: GetAllItems) => {
    const startKey: any = paginationDecode(pagination);
    const query: Orgquery = {
        model: Organization,
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



