export interface EmpCreate {
    PK: string,
    SK: string,
    Name: string,
    Domain: string,
    Email: string,
    PhoneNumber: number,
    Address: Address
    DOB: string,
    JoiningDate: string,
    Pan: string,
    Aadhar: string,
}
export interface Address {
    AddressLine1: string;
    AddressLine2: string;
    Locality: string;
    State: string;
    City: string;
    PinCode: number;
}
export interface GetItem {
    PK: string,
    SK: string
}
export interface GetAllItems {
    PK: string
}
export interface CQuery {
    model: any,
    pk: string;
    query: {
        index: string,
        reverse?: boolean
        limit?: number,
        startKey?: any;
    }
}