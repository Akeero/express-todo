import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ulid } from 'ulid'

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

async function addTask(taskText: string, tableName: string) {
  const createdAt = Date.now()
  const command = new PutCommand({
      TableName: tableName,
      Item: {
        id: ulid(createdAt),
        createdAt: new Date(createdAt).toISOString(),
        taskText
      },
    });
  
  const response = await docClient.send(command);
  return response;
}

async function completeTask(taskId: string, tableName: string){
  const completedAt = Date.now()
  const command = new UpdateCommand({
      TableName: tableName,
      Key: {
        id: taskId
      },
      UpdateExpression: "set completed = :completed, completedAt = :completedAt",
      ExpressionAttributeValues: {
        ":completed": true,
        ":completedAt": new Date(completedAt).toISOString()
      }
    });
  
    const response = await docClient.send(command);
    
    return response;
}

async function getTasks(tableName: string){
  const command = new ScanCommand({
      TableName: tableName,
    });
    
  const response = await docClient.send(command);

  const tasks: Task[] = []
  const completedTasks: Task[] = []
 
  if (response.Items){
    for (let i =0; i < response.Items?.length; i++ ){
      const item = response.Items[i] as Task

      if (item?.completed) { 
        completedTasks.push(item)
      } else {
        tasks.push(item)
      }
    
    }
  }

  return { completedTasks, tasks};
}


export { addTask, completeTask, getTasks }
