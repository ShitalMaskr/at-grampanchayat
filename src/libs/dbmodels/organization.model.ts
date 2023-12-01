import { Entity } from "dynamodb-toolbox";
import { GRAMPANCHAYAT_COLLECT_TABLE } from "@constants/constants";

export const Organization = new Entity({
    name: 'Organization',
    attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true, },
        OgName: { type: 'string' },
        Domain: { type: 'string' },
        CreatedAt: { type: 'number', default: () => new Date().getTime() },
        ModifiedAt: { type: 'number', default: () => new Date().getTime(), onUpdate: true }
    },
    timestamps: false,
    table: GRAMPANCHAYAT_COLLECT_TABLE
} as const);


export const Customer = new Entity({
    // Specify entity name
    name: 'Customer',

    // Define attributes
    attributes: {
        PK: { partitionKey: true }, // flag as partitionKey
        SK: { sortKey: true }, // flag as sortKey and mark hidden
        age: { type: 'number' }, // set the attribute type
        name: { type: 'string', map: 'data' }, // map 'name' to table attribute 'data'
        emailVerified: { type: 'boolean', required: true }, // specify attribute as required
        co: { alias: 'company' }, // alias table attribute 'co' to 'company'
        // status: ['sk', 0], // composite key mapping
        // date_added: ['sk', 1] // composite key mapping
    },

    // Assign it to our table
    table: GRAMPANCHAYAT_COLLECT_TABLE

    // In Typescript, the "as const" statement is needed for type inference
} as const)