import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Complaint = new Entity({
    name: 'Complaint',
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        Name: { type: 'string' },
        Domain: { type: 'string' },
        MobileNo: { type: 'number' },
        TypeOfComplaint: { type: 'string' },
        Status: { type: 'string' },
        ComplaintDetail: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    table: TableCollect
} as const);