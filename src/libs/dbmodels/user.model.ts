import { Entity } from "dynamodb-toolbox";

export const User = new Entity({
    name: 'User',
    attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true, },
        Email: { type: 'string' },
        Password: { type: 'string' },  
        RoleId:{type:'number'}, 
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }  
    },
    timestamps: false,
} as const);