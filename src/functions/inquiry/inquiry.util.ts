import ControllerHelper from "@libs/helpers/controller.helper";
import CRONSService from "@functions/crons/crons.service";
import { STATUS_ACCEPTED } from "@constants/constants";

const cronsService = new CRONSService()

const getInquiryID = async () => {
    //get inquiry id 
    const configObj = await ControllerHelper.getResponse(cronsService.getInquiryId());

    if (configObj.statusCode === 400 || !configObj.body.Item) {
        return { configObj };
    }

    const {
        SerialNumber,
        Month,
        Year,
    } = configObj?.body?.Item;

    const yearFormat = Year?.toString()?.slice(2, 4);
    const monthFormat = Month.toString().padStart(2, '0');
    const inqID = `INQ${yearFormat}${monthFormat}${SerialNumber.toString().padStart(5, '0')}`;
    //end
    return { configObj, inqID };
}

const updateInquiryID = async (configObj) => {
    const updateInquiryId = await ControllerHelper.getResponse(cronsService.updateInquiryId({ ...configObj?.body?.Item, SerialNumber: Number(configObj.body?.Item?.SerialNumber || 0) + 1 }));
    return updateInquiryId;
}

const validateQuotes = async (quotes: Array<IQuote>, quoteToValidate: IQuote) => {
    let isValid = true;
    quotes.forEach(quote => {
        if (quote.SourcePerson.PK === quoteToValidate.SourcePerson.PK && quote.Price === quoteToValidate.Price && !quote?.IsDeleted) { isValid = false; }
    });
    return isValid;
}

const validateQuoteVehicle = async (inquiry: IInquiry, quoteToValidate: IQuote) => {
    let vehiclesAccepted = Number(quoteToValidate.NoOfVehicles) || Number(inquiry.NoOfVehicles);
    (inquiry.Quotes || []).forEach(quote => {
        if (quote.Status == STATUS_ACCEPTED && !quote?.IsDeleted) {
            vehiclesAccepted += (Number(quote?.NoOfVehicles) || Number(inquiry.NoOfVehicles));
        }
    });
    return { isValid: Number(inquiry.NoOfVehicles) >= vehiclesAccepted, vehiclesAccepted };
}

export { getInquiryID, updateInquiryID, validateQuotes, validateQuoteVehicle }