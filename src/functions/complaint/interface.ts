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