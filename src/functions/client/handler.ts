import { response } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { creditThreshold, customerMetricByPk } from "./client.service";
import { CREDITLIMIT_THRESHOLD_PK } from "@constants/constants";

const getClientMetricUtilization = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.pathParameters, 'event.pathParameters');
        const { PK }: any = { PK: event.pathParameters.pk };
        if (PK) {
            const customerMetric = await customerMetricByPk(PK);
            if (customerMetric.$metadata.httpStatusCode != 200 || !customerMetric.Item) {
                console.error(`error fetching ${customerMetric}`);
                return response(400, { message: 'METRIC_DOES_NOT_EXIST' });
            }
            const creditLimitConfiguration = await creditThreshold(CREDITLIMIT_THRESHOLD_PK);
            const percentage: any = creditLimitConfiguration?.Item || {}
            const metric: any = customerMetric.Item;
            const utilizationAmount = (Number(metric.TotalOrderAmount || 0) - Number(metric.Paid || 0)).toFixed(2);
            const utilizationPercentage = Number(((Number(utilizationAmount) / (Number(metric.CreditLimit || 0) + Number(metric.AdvancePaid || 0))) * 100).toFixed(2));
            let res: any = { utilizationPercentage, utilizationAmount, CreditLimit: metric.CreditLimit || 0, AdvancePaid: metric.AdvancePaid || 0, metric, message: null };
            if (utilizationPercentage >= 100) {
                res.message = "Order can't be created, as you have exhausted credit limit";
            }
            if (utilizationPercentage >= Number(percentage?.AlertPercentage || 80)) {
                res.message = `You have exhausted ${utilizationPercentage}% credit limit for this client`
            }
            return response(200, res)
        }
        return response(400, { message: 'ERROR_FETCHING_METRIC' });
    } catch (error) {
        return response(500, error);
    }
})

export {
    getClientMetricUtilization
}