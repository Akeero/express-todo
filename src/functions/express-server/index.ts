import * as serverlessExpress from '@vendia/serverless-express'
import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import app from './app.js'

let serverlessExpressInstance: any

async function setupInstance (event:APIGatewayProxyEventV2, context:Context) {
    // do any async upfront tasks here (ie DB connection)
    serverlessExpressInstance = serverlessExpress.configure({ app })
    return serverlessExpressInstance(event,context)
}

async function handler(event:APIGatewayProxyEventV2, context:Context) {
    
    console.log(JSON.stringify(event))
    console.log(JSON.stringify(context))
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context)
            
    return setupInstance(event, context)
}


export { handler}