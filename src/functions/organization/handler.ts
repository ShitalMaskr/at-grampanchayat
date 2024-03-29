import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { OrgCreate, GetItem } from './interface';
import { createOrganizationDetails, createUser, deleteOrganization, getAllOrganization, getOrganization, updateOrganizationDetails } from './organization.service';
import { ADMIN_ROLE, ORGNIZATION, Organization_Sk } from '@constants/constants';

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
const getOrganizationDetails = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: GetItem = event.queryStringParameters;
        const organizationResponse = await getOrganization({ PK: obj.PK, SK: obj.SK });
        if (organizationResponse.Item) {
            const organizationDetails = organizationResponse.Item;
            return response(200, { message: 'SUCCESS', item: organizationDetails });
        } else {
            return response(404, { message: 'ORGANIZATION_DETAILS_NOT_FOUND' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});

const deleteOrganizationDetails = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: GetItem = event.queryStringParameters;
        const organizationResponse = await deleteOrganization({ PK: obj.PK, SK: obj.SK });
        if (organizationResponse.$metadata.httpStatusCode === 200) {
            return response(200, { message: 'SUCCESS', item: null });
        } else if (organizationResponse.$metadata.httpStatusCode === 404) {
            return response(404, { message: 'ORGANIZATION_DETAILS_NOT_FOUND' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});


const updateOrganization = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: OrgCreate = event.body;
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        obj.PK = obj.Domain;
        obj.SK = Organization_Sk;
        const organization = await getOrganization({ PK: obj.PK, SK: obj.SK });
        if (organization.Item) {
            const updatedOrganization = await updateOrganizationDetails(obj);
            return response(200, { message: 'Organization Updated Successfully', item: updatedOrganization });
        } else {
            return response(404, { message: 'ORGANIZATION_NOT_FOUND' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});
const getAll = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userInformation: any = event.headers["user"];
        const PK = `${userInformation.SK}`;
        const { pagination, limit }: any = event.queryStringParameters;
        const organizationResponse = await getAllOrganization(pagination, limit, { PK });
        if (organizationResponse.Items && organizationResponse.Items.length > 0) {
            return response(200, { message: 'SUCCESS', items: organizationResponse.Items });
        } else {
            return response(404, { message: 'No Organization Details Found' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});

export {
    createOrganization,
    getOrganizationDetails, deleteOrganizationDetails, updateOrganization, getAll
}