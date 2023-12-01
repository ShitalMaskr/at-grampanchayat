import { Entity } from "dynamodb-toolbox";
import { RelifeCollect } from ".";

export const Role = new Entity({
    // Specify entity name
    name: 'Role',

    // Define attributes
    attributes: {
    PK: { partitionKey: true, },
        SK: { sortKey: true, },
        RoleName: { type: 'string' },
        RoleDescription: { type: 'string' }, 
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }      
    },
    timestamps: false,
    // Assign it to our table
    table: RelifeCollect

    // In Typescript, the "as const" statement is needed for type inference
} as const);