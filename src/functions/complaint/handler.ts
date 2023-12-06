import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy, middyfyAuth } from '@libs/lambda';
import { ComplaintCreate } from './interface';
import { COMPLAINT, COMPLAINT_SK } from '@constants/constants';
import { createComplaintDetails, getAllComplaint, getComplaintDetails } from './complaint.service';

const createComplaint = middyfyAuth(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: ComplaintCreate = event.body;
        const timestamp = Date.now();
        if (!obj.Domain) {
            return response(400, { message: 'ERROR_DOMAIN_REQUIRED' });
        }
        // @ts-ignore
        obj.PK = `${COMPLAINT}#${timestamp}`;
        obj.SK = `${COMPLAINT}#${COMPLAINT_SK}`;
        const complaint = await createComplaintDetails(obj);
        if (complaint.$metadata.httpStatusCode == 400) {
            console.error('error getting material =>', complaint);
            return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
        }

        return response(200, { message: 'Complaint Send Successfully', item: complaint, PK: obj.PK, SK: obj.SK });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});

const getComplaint = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // @ts-ignore
        const obj: GetItem = event.queryStringParameters;
        const complaintResponse = await getComplaintDetails({ PK: obj.PK, SK: obj.SK });
        if (complaintResponse.Item) {
            const complaintDetail = complaintResponse.Item;
            return response(200, { message: 'SUCCESS', item: complaintDetail });
        } else {
            return response(404, { message: 'COMPLAINT_DETAILS_NOT_FOUND' });
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
        const complaintResponse = await getAllComplaint(pagination, limit, SK);
        if (complaintResponse.Items && complaintResponse.Items.length > 0) {
            return response(200, { message: 'SUCCESS', items: complaintResponse.Items });
        } else {
            return response(404, { message: 'No Complaint Details Found' });
        }
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
});

export {
    createComplaint, getComplaint, getAll
}
