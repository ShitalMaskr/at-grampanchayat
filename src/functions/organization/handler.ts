import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { OrgCreate } from './interface';
import { createOrganizationDetails, createUser, getOrganization } from './organization.service';
import { ADMIN_ROLE, Organization_Sk } from '@constants/constants';

const createOrganization = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.headers['user'], 'login User info');
        // @ts-ignore
        const obj: OrgCreate = event.body;
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        obj.PK = obj.Domain;
        obj.SK = Organization_Sk;
        const org = await getOrganization({ PK: obj.PK, SK: obj.SK });
        if (!org.Item) {
            await createUser({
                PK: `User#${obj.Email}`,
                SK: `${Organization_Sk}#${obj.PK}`,
                Email: obj.Email,
                Password: "password",
                RoleId: ADMIN_ROLE
            })
            const organization = await createOrganizationDetails(obj);
            console.log(organization, "userDetails")
            if (organization.$metadata.httpStatusCode == 400) {
                console.error('error getting material =>', organization);
                return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
            }
            return response(200, { message: 'SUCCESS', item: organization });
        }
        return response(400, { message: 'DOMAIN_ALREADY_EXISTED' });

    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {
    createOrganization
}