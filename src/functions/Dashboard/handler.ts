// dashboard.handler.js

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from '@libs/lambda';
import { response } from '@libs/api-gateway';
import { getAllEmployeeCount, getAllCitizenCount, getAllComplaintCount } from "./dashboard.service";

export const allDashboardDetails = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userInformation: any = event.headers["user"];
    const SK = userInformation.SK;
    const employeeCount = await getAllEmployeeCount(SK);
    const citizenCount = await getAllCitizenCount(SK);
    const complaintCount = await getAllComplaintCount(SK);
    return response(200, {
      message: 'SUCCESS',
      employeeCount: employeeCount.ScannedCount,
      citizenCount: citizenCount.ScannedCount,
      complaintCount: complaintCount.ScannedCount,
    });
  } catch (error) {
    console.log('error', error);
    return response(500, error);
  }
});
