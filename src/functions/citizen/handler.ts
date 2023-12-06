import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { CitizenCreate, GetAllItems, GetItem } from './interface';
import { createCitizenDetails, getAllCitizen, getCitizenDetails, updateCitizenDetails } from './citizen.service';
import { CITIZEN } from '@constants/constants';

const createCitizen = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userInformation: any = event.headers["user"];
        // @ts-ignore
        const obj: CitizenCreate = event.body;
        const timestamp = Date.now();
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        // @ts-ignore
        obj.PK = `${CITIZEN}#${timestamp}`;
        obj.SK = `${CITIZEN}#${userInformation.SK}`;
        const citizen = await createCitizenDetails(obj);
        if (citizen.$metadata.httpStatusCode == 400) {
            console.error('error getting material =>', citizen);
            return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
        }
        return response(200, { message: 'Citizen Added Successfully', item: citizen, PK: obj.PK, SK: obj.SK });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});

const getCitizen = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: GetItem = event.queryStringParameters;
        const citizenResponse = await getCitizenDetails({ PK: obj.PK, SK: obj.SK });
        if (citizenResponse.Item) {
            const citizenDetails = citizenResponse.Item;
            return response(200, { message: 'SUCCESS', item: citizenDetails });
        } else {
            return response(404, { message: 'CITIZEN_DETAILS_NOT_FOUND' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});


const updateCitizen = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: CitizenCreate = event.body;
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        const existingCitizenResponse = await getCitizenDetails({ PK: obj.PK, SK: obj.SK });
        if (existingCitizenResponse.Item) {
            const updatedCitizen = { ...existingCitizenResponse.Item, ...obj };
            const result = await updateCitizenDetails(updatedCitizen);
            return response(200, { message: 'Citizen Updated Successfully', item: result });
        } else {
            return response(404, { message: 'No Citizen Details Found' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});


const getAll = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userInformation: any = event.headers["user"];
        const SK = userInformation.SK;
        const { pagination, limit }: any = event.queryStringParameters;
        const citizenResponse = await getAllCitizen(pagination, limit, SK);
        if (citizenResponse.Items && citizenResponse.Items.length > 0) {
            return response(200, { message: 'SUCCESS', items: citizenResponse.Items });
        } else {
            return response(404, { message: 'No Citizen Details Found for User' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});



export {
    createCitizen, getCitizen, updateCitizen, getAll
}
