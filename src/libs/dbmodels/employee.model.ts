import { Entity } from "dynamodb-toolbox";
import { TableCollect } from ".";

export const Employee = new Entity({
    // Specify entity name
    name: 'Employee',

    // Define attributes
    attributes: {
        PK: { partitionKey: true, },
        SK: { sortKey: true, },
        EmployeeName: { type: 'string' },
        Contact: { type: 'number' },
        Address: { type: 'map' },
        DOB: { type: 'number', default: () => new Date().getTime() },
        Email: { type: 'string' },
        JoiningDate: { type: 'number', default: () => new Date().getTime() },
        Pan: { type: 'string' },
        Aadhar: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    // Assign it to our table
    table: TableCollect

    // In Typescript, the "as const" statement is needed for type inference
} as const);