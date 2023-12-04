export interface EmpCreate {
    PK: string,
    SK: string,
    Name: string,
    Domain: string,
    Email: string,  
    PhoneNumber:number,
    Address:string,
    DOB:Date,
    JoiningDate:Date,
    PAN:string,
    Aadhar:string,
}
export interface GetItem {
    PK: string,
    SK: string
}
