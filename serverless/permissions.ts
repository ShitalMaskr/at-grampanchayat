const permissions = [
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:DescribeTable',
      'dynamodb:Query',
      'dynamodb:Scan',
      'dynamodb:GetItem',
      'dynamodb:PutItem',
      'dynamodb:UpdateItem',
      'dynamodb:DeleteItem',
      'dynamodb:BatchWriteItem',
    ],
    Resource: 'arn:aws:dynamodb:${env:region}:*:*',
  },
  {
    Effect: 'Allow',
    Action: [
      'sns:*',
      'sqs:*',
      'ssm:*',
      'secretsmanager:GetSecretValue',
    ],
    Resource: '*',
  }
];

export default permissions;
