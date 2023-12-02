import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Complaint = new Entity({
    // Specify entity name
    name: 'Complaint',

    // Define attributes
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Contact: { type: 'string' },
        TypeOfComplaint: { type: 'string' },
        ComplaintDetail: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    // Assign it to our table
    table: TableCollect

    // In Typescript, the "as const" statement is needed for type inference
} as const);