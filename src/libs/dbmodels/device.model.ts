import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Device = new Entity({
    // Specify entity name
    name: 'Device',

    // Define attributes
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        DeviceArn: { type: 'string' },
        RecordType: { type: 'string' },
        DeviceDetails: { type: 'map' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    // Assign it to our table
    table: TableCollect

    // In Typescript, the "as const" statement is needed for type inference
} as const);