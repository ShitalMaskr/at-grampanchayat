import type { AWS } from '@serverless/typescript';
import permissions from 'serverless/permissions';
import { organization } from '@functions/organization';
import { employee } from '@functions/employee';
import { login } from '@functions/login';
import { citizen } from '@functions/citizen';
import { complaint } from '@functions/complaint';
import { excludePackage } from 'serverless/packages';

const serverlessConfiguration: AWS = {
    useDotenv: true,
    service: 'at-grampanchayat',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: excludePackage,
            target: 'node18',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10
        },
        'serverless-offline': {
            httpPort: 6000,
            lambdaPort: 6601,
            useChildProcesses: true
        },
        region: '${env:REGION}',
        accountId: '${env:ACCOUNT_ID}',
        LambdaLayerVersion: '${env:LAMBDA_LAYER_VERSION}',
        API_NAME: '${env:SERVICE_NAME}${env:STAGE}',
    },
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        memorySize: 256,
        region: 'ap-south-1',
        stage: '${sls:stage}',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        apiName: '${self:custom.API_NAME}',
        environment: {
            NODE_PATH: './:/opt/node_modules',
            REGION: '${self:custom.region}',
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        iam: {
            role: {
                statements: permissions
            }
        },
        layers: [
            'arn:aws:lambda:${self:custom.region}:${self:custom.accountId}:layer:GramSevaLayer:${self:custom.LambdaLayerVersion}',
        ],
    },
    // import the function via paths
    functions: {
        ...login,
        ...organization,
        ...employee,
        ...citizen,
        ...complaint
    },
    package: { individually: true }
};
module.exports = serverlessConfiguration;