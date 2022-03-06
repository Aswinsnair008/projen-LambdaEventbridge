myLambda1- First Lambda function that triggers the code build
	Please make changes to the 'lambda_build_start.js' accordingly
eventbus1- Cloudwatch Event bridge that gets triggered whenever a Pull request is placed.
	resources: ["arn:add the resource arn here"] -Pleas make changes to the 'arn' to point to the right resouce
myLambda2- Second Lambda function that shows the status/result.
	Please make changes to the-lambda_build_result.js accordingly
eventbus2- Cloudwatch Event bridge that will show the status.
	resources: ["arn:add the resource arn here"] -Pleas make changes to the 'arn' to point to the right resouce



If getting errors with cdk deploy,synth,bootstrap try,
cdk deploy --app 'node -r ts-node/register bin/cdk_projen_lambda.ts'
cdk bootstrap --app 'node -r ts-node/register bin/cdk_projen_lambda.ts'
cdk synth --app 'node -r ts-node/register bin/cdk_projen_lambda.ts'
