export interface DQuery {
    model: any;
    pk: string;
    query: {
        index: string;
        reverse?: boolean;
    };
}
export interface GetAllItems {
    SK: string
}