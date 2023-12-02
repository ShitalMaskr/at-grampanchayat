import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Table } from 'dynamodb-toolbox';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { GRAMPANCHAYAT_COLLECT_TABLE } from '@constants/constants';

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // if not false explicitly, we set it to true.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
}

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    // NOTE: this is required to be true in order to use the bigint data type.
    wrapNumbers: false, // false, by default.
}

const translateConfig = { marshallOptions, unmarshallOptions }

// Instantiate a DocumentClient
export const DocumentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), translateConfig)
// Instantiate a table
export const TableCollect = new Table({
    name: GRAMPANCHAYAT_COLLECT_TABLE,
    partitionKey: 'PK',
    sortKey: 'SK',
    DocumentClient,
    // indexes: {
    //     'SK-PK-Index': { partitionKey: 'SK', sortKey: 'PK' },
    //     'ByDateIndex': { partitionKey: 'SK', sortKey: 'CreatedAt' },
    //     'G-StatusIndex': { partitionKey: 'GStatus', sortKey: 'CreatedAt' },
    //     'GSIDataIndex': { partitionKey: 'Data', sortKey: 'CreatedAt' },
    //     'RecordTypeIndex': { partitionKey: 'RecordType', sortKey: 'CreatedAt' },
    //     'ScheduledDateIndex': { partitionKey: 'RecordType', sortKey: 'ScheduledDate', }
    // }
});
