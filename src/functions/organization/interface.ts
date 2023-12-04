export interface OrgCreate {
    PK: string,
    SK: string,
    Name: string,
    Domain: string,
    Email: string,
    ContactNo: number,
    State: string,
    City: string,
    PinCode: number,
    VillageName: string,
    isActive: string,
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
