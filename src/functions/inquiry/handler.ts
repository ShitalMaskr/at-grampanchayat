import { response } from '@libs/api-gateway';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';




const getMaterial = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        // const material = await ControllerHelper.getResponse(inquiryService.getMaterial());
        // if (material.statusCode === 400 || !material.body.Items) {
        //     console.error('error getting material =>', material.body);
        //     return response(400, { message: 'ERROR_GETTING_MATERIAL_TYPES' });
        // }
        return response(200, { message: "DONE" });
    } catch (error) {
        console.log('error', error);
        return response(500, error);
    }
})


export {

    getMaterial
}