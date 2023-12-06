export interface ComplaintCreate {
    PK: string;
    SK: string;
    Domain: string,
    Name: string;
    MobileNo: number;
    TypeOfComplaint: string;
    Status: string,
    ComplaintDetail: string
}
export interface GetItem {
    PK: string,
    SK: string
}
export interface CQuery {
    model: any,
    pk: string;
    query: {
        index: string,
        reverse?: boolean
        startKey?: any;
    }
}