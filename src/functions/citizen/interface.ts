export interface CitizenCreate {
    PK: string;
    SK: string;
    Name: string;
    Domain: string;
    Email: string;
    MobileNo: number;
    Address: Address;
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