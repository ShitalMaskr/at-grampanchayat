import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Organization = new Entity({
    name: 'Organization',
    attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Domain: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    table: TableCollect
} as const);
