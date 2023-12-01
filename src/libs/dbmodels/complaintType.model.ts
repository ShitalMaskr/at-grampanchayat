import { Entity } from "dynamodb-toolbox";
import { RelifeCollect } from ".";

export const ComplaintType = new Entity({
    // Specify entity name
    name: 'ComplaintType',

    // Define attributes
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        ComplaintName: { type: 'string' },
        Contact: { type: 'string' },  
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    // Assign it to our table
    table: RelifeCollect

    // In Typescript, the "as const" statement is needed for type inference
} as const);