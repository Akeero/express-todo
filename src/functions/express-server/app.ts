import { getCurrentInvoke } from '@vendia/serverless-express'
import * as express from 'express'
import { baseHtml } from './templates.js'
import bodyParser from 'body-parser'
import { addTask, completeTask, getTasks } from './db.js'

const tableName = process.env.TABLE_NAME!
let basePath: string = ''

const app = express.default()

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

let taskArray: Task[] = [];
let completedTasks: Task[] = []

app.get('/', async (req,res)=>{
 
    // url rewrite to add trailing slash needed for form submission to work
    const { event } = getCurrentInvoke()
    const requestPath = event.requestContext.path
    if (requestPath.substring(requestPath.length-1) !== '/') {
        if (!basePath) {
            basePath = 'https://' + event?.requestContext.domainName + "/" + event?.requestContext?.stage + "/"
        }
        res.redirect(basePath)
    } else {
        const allTasks = await getTasks(tableName)
        taskArray = allTasks.tasks ?? []
        completedTasks = allTasks.completedTasks ?? []
        res.send(baseHtml(taskArray, completedTasks))
    }
})

app.post('/addtask', async (req, res)=>{
    const newTask = req.body.newtask
    await addTask(newTask, tableName)
    if (!basePath) {
        const { event } = getCurrentInvoke()
        basePath = 'https://' + event?.requestContext.domainName + "/" + event?.requestContext?.stage + "/"
    }
    res.redirect(basePath);
});

app.post("/removetask", async (req, res)=>{
    const taskList = Object.keys(req.body)
    
    taskList.forEach(async (taskId)=>{
        await completeTask(taskId, tableName)
    })
    if (!basePath) {
        const { event } = getCurrentInvoke()
        basePath = 'https://' + event?.requestContext.domainName + "/" + event?.requestContext?.stage + "/"
    }
    res.redirect(basePath);
});

export default app