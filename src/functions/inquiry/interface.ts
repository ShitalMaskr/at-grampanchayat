interface IInquiry {
    PK: string,
    SK: string,
    Type: string,
    Customer: ICustomer,
    VehicleType: IVehicle,
    Status: string,
    Data: string,
    NoOfVehicles: number,
    SalesPrice: number,
    TargetBuyingPrice?: number,
    WorkingHours?: number,
    NumberOfDays?: number,
    Source: string,
    Destination: string,
    ScheduledDate: number,
    DateOfDeployment: number,
    EndDateOfDeployment: number,
    UOM: string,
    SalesPerson: any,
    SourcePerson: any,
    Quotes: Array<IQuote>,
    RecordType: string,
    IsDeleted: boolean,
    ValueOfMaterial: number,
    WeightOfMaterial: number,
    PriceAllInclusive: boolean,
    Remark?: string,
    Material?: any,
    Emirate?: any,
    OrderNotCreate?: boolean,
    userAttributes?: any,
    Permissions: any,
    Branch?: any,
    BranchId?: string,
    GroupCurrency: any
}

interface IQuote {
    PK: string,
    SK: string,
    Price: number,
    SourcePerson: any,
    Status: string,
    NumberOfDays: number,
    QuoteEndTime: number,
    Remark?: string,
    NoOfVehicles?: number,
    IsDeleted: boolean,
}

type IGetInquiry = Pick<IInquiry, 'PK' | 'SK'>

interface IVehicle {
    PK: string,
    Name: string
}

interface ICustomer {
    PK?: string,
    FullName: string,
    Email?: string,
    PhoneNumber?: number
}
interface IQuery {
    model: any,
    pk: string;
    query: {
        index: string,
        reverse?: boolean
        limit?: number,
        attributes?: any,
        filters?: any
    }
}

interface IAddUpdateQuote {
    PK: string,
    SK: string,
    Quote: IQuote
}
