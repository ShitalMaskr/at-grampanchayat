import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Citizen = new Entity({
    // Specify entity name
    name: 'Citizen',

    // Define attributes
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Locality: { type: 'string' },
        Contact: { type: 'number' },
        Address: { type: 'map' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    // Assign it to our table
    table: TableCollect

    // In Typescript, the "as const" statement is needed for type inference
} as const);