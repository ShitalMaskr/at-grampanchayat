import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { OrgCreate } from './interface';
import { createOrganizationDetails } from './organization.service';
import { Customer } from '@libs/dbmodels/organization.model';

const createOrganization = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        //@ts-ignore
        const obj: OrgCreate = event.body;

        obj.PK = obj.Domain;
        obj.SK = "Organization";
        console.log(obj, "objs")
        // Create an item (using table attribute names or aliases)
        const customer = {
            PK: "123",
            SK:"Organization",
            age: 35,
            name: 'Jane Smith',
            emailVerified: true,
            company: 'ACME',
            // status: 'active',
            // date_added: '2020-04-24'
        }

        // Use the 'put' method of Customer:
        await Customer.put(customer)
        // const userDetails = await createOrganizationDetails(obj);
        // console.log(userDetails,"userDetails")
        // if (!userDetails) {
        //     console.error('error getting material =>', userDetails);
        //     return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
        // }
        return response(200, { message: "DONE" });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {
    createOrganization
}