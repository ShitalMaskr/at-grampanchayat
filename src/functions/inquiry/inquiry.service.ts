import { Inquiries } from "@libs/dbmodels/inquiry.model";
import { Customers } from "@libs/dbmodels/customer.model";
import { VehicleTypes } from "@libs/dbmodels/vehicletype.model";
import { INQUIRY_RECORD_TYPE, RECORD_TYPE_INDEX, SK_PK_INDEX, DATA_INDEX, CUSTOMER_TYPE_ENTERPRISE, SYSTEM_VEHICLE_TYPE, SYSTEM_MATERIAL, INQUIRY_DATA_INDEX_STATUS } from "@constants/constants";
import { SystemConfiguration } from "@libs/dbmodels/system-configuration.model";
import { paginationDecode } from "@libs/api-gateway";

class InquiryService {

    constructor() {
    }

    async create(obj: IInquiry) {
        return await Inquiries.put(obj, {
            strictSchemaCheck: false
        });
    }

    async get(params: IGetInquiry) {
        // params is {PK,SK}
        return await Inquiries.get(params);
    }

    async update(obj) {
        return await Inquiries.update(obj, {
            strictSchemaCheck: false
        });
    }

    async allInquiries(pagination?: string, limit?: number, status?: string) {
        const startKey = paginationDecode(pagination);
        const query: IQuery = {
            model: Inquiries,
            pk: status ? INQUIRY_DATA_INDEX_STATUS(status) : INQUIRY_RECORD_TYPE,
            query: {
                index: status ? DATA_INDEX : RECORD_TYPE_INDEX,
                limit: limit || 50,
                reverse: true,
                filters: { attr: 'IsDeleted', eq: false },
                ...(startKey && { startKey: startKey })
            }
        }
        return await this.getByIndex(query);
    }

    async allInquiriesByUser(PK: string, pagination?: string, limit?: number, status?: string) {
        const startKey = paginationDecode(pagination);
        const filters: any = [{ attr: 'IsDeleted', eq: false }];
        if (status) {
            filters.push({ attr: 'Data', eq: INQUIRY_DATA_INDEX_STATUS(status) });
        }
        const query: IQuery = {
            model: Inquiries,
            pk: PK,
            query: {
                index: SK_PK_INDEX,
                reverse: true,
                limit: limit || 50,
                filters: filters,
                ...(startKey && { startKey: startKey })
            }
        }
        return await this.getByIndex(query);
    }

    async allVehicleType() {
        const query: IQuery = {
            model: VehicleTypes,
            pk: SYSTEM_VEHICLE_TYPE,
            query: {
                index: SK_PK_INDEX,
                reverse: true,
                attributes: ['PK', 'Name']
            }
        }
        return await this.getByIndex(query);
    }

    async allCustomers() {
        const query: IQuery = {
            model: Customers,
            pk: CUSTOMER_TYPE_ENTERPRISE,
            query: {
                index: DATA_INDEX,
                reverse: true,
                attributes: ['PK', 'FullName', 'Email', 'Phone', "Branch", "BranchId"]
            }
        }
        return await this.getByIndex(query);
    }

    async getMaterial() {
        const query: IQuery = {
            model: SystemConfiguration,
            pk: SYSTEM_MATERIAL,
            query: {
                index: SK_PK_INDEX,
                reverse: true,
            }
        }
        return await this.getByIndex(query);
    }

    async getByIndex({ model, pk, query }: IQuery) {
        console.log('Params --->', { model: model.name, pk, query });
        return await model.query(pk, query);
    }

    async getCustomer(params: IGetInquiry) {
        // params is {PK,SK}
        return await Customers.get(params);
    }
}

export default InquiryService;