import * as targets from '@aws-cdk/aws-events-targets';
import * as events from '@aws-cdk/aws-events';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
// import { App, Stack, StackProps } from 'aws-cdk-lib';
// import { Construct } from 'constructs';


export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const myLambda1 = new lambda.Function(this, "LambdaCodeBuildStart", {
      code: lambda.Code.fromAsset('src'),
      handler: 'lambda_build_start.handler',
      runtime: lambda.Runtime.NODEJS_12_X
    })
    
    const eventbus1 = new events.EventBus(this, "CodebuildPullRequest")
    new cdk.CfnOutput(this, "BusName1", {value: eventbus1.eventBusName})

    new events.Rule(this, "LambdaProcessorRule1", {
        eventBus: eventbus1,
        eventPattern: {source: ["aws.codecommit"],
        detailType: ["CodeCommit Pull Request State Change"],
        resources: ["arn:add the resource arn here"],
        detail: {
          event: ["pullRequestCreated"]
        	}
      },
        targets: [new targets.LambdaFunction(myLambda1)]
      })
      const myLambda2 = new lambda.Function(this, "LambdaCodeBuildResult", {
        code: lambda.Code.fromAsset('src'),
        handler: 'lambda_build_result.handler',
        runtime: lambda.Runtime.NODEJS_12_X
    })
      
      const eventbus2 = new events.EventBus(this, "CodebuildState")
      new cdk.CfnOutput(this, "BusName2", {value: eventbus2.eventBusName})
  
      new events.Rule(this, "LambdaProcessorRule", {
          eventBus: eventbus2,
          eventPattern: {source: ["aws.codebuild"],
          detailType: ["CodeBuild Build State Change"],
          resources: ["arn:add the resource arn here"],
          detail: {
            'build-status': ["SUCCEEDED", "STOPPED", "FAILED"]
            }
        },
          targets: [new targets.LambdaFunction(myLambda2)]
        })
  }
}