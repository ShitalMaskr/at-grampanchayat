import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Organization = new Entity({
    name: 'Organization',
    attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Domain: { type: 'string' },
        Email: { type: 'string' },
        MobileNo: { type: 'number' },
        Address: { type: 'map' },
        AddressLine1: { type: 'string' },
        AddressLine2: { type: 'string' },
        State: { type: 'string' },
        City: { type: 'string' },
        PinCode: { type: 'number' },
        VillageName: { type: 'string' },
        Landmark: 'string',
        Status: 'string',
        isActive: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    table: TableCollect
} as const);
