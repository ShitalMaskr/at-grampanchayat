import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Citizen = new Entity({
    name: 'Citizen',
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Domain: { type: 'string' },
        Email: { type: 'string' },
        Locality: { type: 'string' },
        MobileNo: { type: 'number' },
        Address: { type: 'map' },
        AddressLine1: { type: 'string' },
        AddressLine2: { type: 'string' },
        State: { type: 'string' },
        City: { type: 'string' },
        PinCode: { type: 'number' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    table: TableCollect
} as const);