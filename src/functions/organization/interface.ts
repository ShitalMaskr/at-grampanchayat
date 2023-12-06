export interface OrgCreate {
    PK: string,
    SK: string,
    Name: string,
    Domain: string,
    Email: string,
    MobileNumber: number,
    Address: Address,
    VillageName: string,
    isActive: string,
}
export interface Address {
    AddressLine1: string;
    AddressLine2: string;
    State: string;
    City: string;
    PinCode: number;
}
export interface GetItem {
    PK: string,
    SK: string
}


export interface UserCreate {
    PK: string,
    SK: string,
    RoleId: number,
    Email: string,
    Password: string
}
export interface Orgquery {
    model: any,
    pk: string;
    query: {
        index: string,
        reverse?: boolean
        startKey?: any;
    }
}
