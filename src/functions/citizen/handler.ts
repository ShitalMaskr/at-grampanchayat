import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { CitizenCreate } from './interface';
import { Citizen_Sk } from '@constants/constants';
import { createCitizenDetails } from './citizen.service';

const createCitizen = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: CitizenCreate = event.body;
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        obj.PK = obj.Domain;
        obj.SK = Citizen_Sk;
        const citizen = await createCitizenDetails(obj);
        if (citizen.$metadata.httpStatusCode == 400) {
            console.error('error getting material =>', citizen);
            return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
        }
        return response(200, { message: 'Citizen Added Successfully', item: citizen });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {
    createCitizen
}