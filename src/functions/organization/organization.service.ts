
import { OrgCreate } from "./interface";
import { Organization } from "@libs/dbmodels/organization.model";


export const createOrganizationDetails = async(obj: OrgCreate) => {
        return await Organization.put(obj);
    }