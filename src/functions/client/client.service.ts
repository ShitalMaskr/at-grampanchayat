import { CustomerMetrics } from "@libs/dbmodels/customer-metric.model";
import { INVOICE_MATRIC_SK, SK_PK_INDEX, SYSTEM_CONFIGURATION_SK } from "@constants/constants";
import moment from "moment";


const allCustomerMetrics = async () => {
    const query: IQuery = {
        model: CustomerMetrics,
        pk: INVOICE_MATRIC_SK,
        query: {
            index: SK_PK_INDEX,
            reverse: true,
        }
    }
    return await getByIndex(query);
}

const customerMetricByPk = async (PK: any) => {
    return await CustomerMetrics.get({ PK, SK: INVOICE_MATRIC_SK });
}
const INVOICE_MATRIC_USER_PK = (user: any) => `Invoice#${user}`;
const buildMonthlyMetricQuery = (params: any, metric: any) => {
    const {
        pickUpTime, scheduledDate, totalOrderAmount, oldOrderPrice
    } = params;
    const orderYear = moment(pickUpTime || scheduledDate).format("YYYY");
    const orderMonth = moment(pickUpTime || scheduledDate).format("M");
    const orderMonthMetric = (metric[orderYear] && metric[orderYear][orderMonth] || {});
    const MonthlyCreditLimit = Number(orderMonthMetric?.MonthlyCreditLimit || 0) || Number(metric.MonthlyCreditLimit || 0)
    const userMetric = {
        [orderYear]: {
            ...(metric[orderYear] || {}),
            [orderMonth]: {
                TotalMonthlyOrder: (Number(orderMonthMetric?.TotalMonthlyOrder || 0) - Number(oldOrderPrice || 0)) + Number(totalOrderAmount || 0),
                MonthlyCreditLimit
            }
        }
    }
    return userMetric;
}
const checkUserCreditLimit = async (params: any) => {
    const {
        userId, currentOrderAmount, oldOrderPrice, pickUpTime, scheduledDate
    } = params;
    const userPk = INVOICE_MATRIC_USER_PK(userId);
    const invoiceMatric = await customerMetricByPk(userPk);
    if (invoiceMatric?.Item && userId) {
        const userMetric = invoiceMatric?.Item;
        const monthlyOrder = buildMonthlyMetricQuery({ ...params, totalOrderAmount: currentOrderAmount }, userMetric)
        const orderYear = moment(pickUpTime || scheduledDate).format("YYYY");
        const orderMonth = moment(pickUpTime || scheduledDate).format("M");
        const monthLimit = monthlyOrder[orderYear] && monthlyOrder[orderYear][orderMonth];
        const remainingOrderAmount = Number(userMetric?.TotalOrderAmount) > 0 ? (Number(userMetric?.TotalOrderAmount) - Number(userMetric.Paid || 0)) : 0;
        const removeOld = remainingOrderAmount - Number(oldOrderPrice || 0);

        const limit = {
            valid: (((Number(userMetric?.CreditLimit || 0) + Number(userMetric?.AdvancePaid || 0)) >=
                ((removeOld + Number(currentOrderAmount)) > 0 ? (removeOld + Number(currentOrderAmount)) : -(removeOld + Number(currentOrderAmount))))
                && (Number(monthLimit.MonthlyCreditLimit || 0) >= Number(monthLimit.TotalMonthlyOrder))),
            invoiceMatric: invoiceMatric?.Item
        }
        console.log("########### credit limit", limit, 'remainingOrderAmount', remainingOrderAmount);
        return limit;
    }
    return {
        valid: false, invoiceMatric: null
    };
}


const creditThreshold = async (PK: any) => {
    return await CustomerMetrics.get({ PK, SK: SYSTEM_CONFIGURATION_SK });
}
const getByIndex = async ({ model, pk, query }: IQuery) => {
    return await model.query(pk, query);
}

export {
    allCustomerMetrics,
    customerMetricByPk,
    creditThreshold,
    checkUserCreditLimit
}