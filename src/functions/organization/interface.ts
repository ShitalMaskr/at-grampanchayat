export interface OrgCreate {
    PK: string,
    SK: string,
    Name: string,
    Domain: string,
    Email: string
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
