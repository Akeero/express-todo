# Express Template

Running Express.js, or similar frameworks, in Lambda is common pattern that allows you to migrate to a more serverless architecture. The pattern is relatively simple. 

A single function hosts your Express.js server, and routes all paths and methods to this Lambda function to allow Express.js to handle routing logic. This is a tradeoff in complexity. You have a simpler infrastructure, but more complex function.

We're going to build out a simple Todo App using Express. be using the [`@vendia/serverless-express`](https://www.npmjs.com/package/@vendia/serverless-express) package to run Express in a Lambda function.

## Resources

It consists of the following resources:

- **API Gateway**
  - Configured as a Proxy Resource to redirect all requests to the Lambda function
    - [Read more about an API Gateway Proxy Resource](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html)
- **Lambda Function**
  - Express function: Hosts your Express.js server and all associated routing and business logic.
- **DynamoDB Table**
  - We only have one model, so a single Table will do. 
  - If we want to extend this application we can add multiple tables, one per model or we could use Single Table Design to host multiple models in a single table.
    - [The What, Why, and When of Single-Table Design with DynamoDB](https://www.alexdebrie.com/posts/dynamodb-single-table/)


![Screenshot of Akeero showing the Express template](https://docs.akeero.com/assets/express-aws-infra.png 'Screenshot of Akeero showing the Next.js template')

## Pre-Requisites

Once off steps needed to enable you to run CDK scripts to deploy infrastructure in your AWS account.

- An active GitHub account
- An active AWS Account - [Creating a standalone AWS account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html)
- AWS CLI installed and configured - [Get started with the AWS CLI - AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
- An AWS Account and Region bootstrapped with the CDK - [Bootstrapping - AWS Cloud Development Kit (AWS CDK) v2](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html)

<Note>This can be done just before the first deploy</Note>

## Getting Started

1. Clone Express Demo repository locally

```bash 
git clone https:/github.com/Akeero/express-todo.git 
```

2.  Install Dependencies:

```bash 
cd express-todo
npm install
```

3.  Head to Akeero to generate a project from the Express template (Templates > Express Template)

<div className="w-full">
  <video autoPlay width="100%" loop muted controls>
    <source src="https://docs.akeero.com/assets/select_template_express.mp4" />
  </video>
</div>

4. You should now be in the Diagram to Code canvas. First up let’s edit the project name

<div className="w-full">
  <video autoPlay width="100%" loop muted controls>
    <source src="https://docs.akeero.com/assets/rename_express_project.mp4" />
  </video>
</div>

5. Save the project locally, selecting the root folder of your web app.

<div className="w-full">
  <video autoPlay width="100%" loop muted controls>
    <source src="https://docs.akeero.com/assets/save_locally.mp4" />
  </video>
</div>

6. Go back to the terminal and install the relevant CDK and Akeero dependencies

```bash {{}}
cd akeero-cdk
npm install
```

If you have not bootstrapped CDK for the first time in your AWS account and AWS region, run the following. You only need to bootstrap an account and region once for CDK to work.

```bash
npx cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1
```

7. Run CDK Deploy

```bash 
npx cdk deploy
```

This command will deploy your Express app!

Once deployed you should get the API Gateway domain of your site as an output for the command! Click on the link and you'll get a live running Todo app!

This is a simple example, but it can be applied to any existing Express app you're looking to migrate to AWS Lambda.

Happy building!
