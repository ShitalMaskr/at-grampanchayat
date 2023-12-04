import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { CitizenCreate } from './interface';
import { createCitizenDetails } from './citizen.service';

const createCitizen = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userInformation: any = event.headers["user"];
        if (!userInformation || !userInformation.userId) {
            return response(401, { message: 'Invalid or missing user information in the token' });
        }
        // @ts-ignore
        const obj: CitizenCreate = event.body;
        obj.PK = userInformation.userId;
        obj.SK = userInformation.SK;

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
});

export {
    createCitizen
}
