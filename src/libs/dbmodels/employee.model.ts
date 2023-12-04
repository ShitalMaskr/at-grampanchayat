import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Employee = new Entity({
    name: 'Employee',
    attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Domain: { type: 'string' },
        Email: { type: 'string' },
        Contact: { type: 'number' },
        Address: { type: 'map' },
        DOB: { type: 'number', default: () => new Date().getTime() },
        JoiningDate: { type: 'number', default: () => new Date().getTime() },
        Pan: { type: 'string' },
        Aadhar: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    table: TableCollect
} as const);
