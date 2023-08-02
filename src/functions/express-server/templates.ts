const tasksCompleted = (tasks: Task[])=> {
   const renderedTasks = tasks.map(task=>{  
      return`
      <li>
          <input type="checkbox" checked id="${task.id}" />
          ${task.taskText}
      </li>
      `
   })
   return renderedTasks.join("\n")
}

const taskAdded = (tasks: Task[])=>{
   const renderedTasks = tasks.map(task=>{  
      return `
      <li>
          <input type="checkbox" name="${task.id}" value="${task.taskText}" />
          ${task.taskText}
      </li>
      `
   })
   return renderedTasks.join("\n")
}

const baseHtml = (tasks: Task[], completedTasks: Task[]) => `
<html>
   <head>
      <title>ToDo App </title>
      <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet">
      <link href="/styles.css" rel="stylesheet">
   </head>
   <body>
      <div class="container">
         <h2> A Simple ToDo List App </h2>
         <form action ="./addtask" method="POST">
            <input type="text" name="newtask" placeholder="add new task">        
            <button>Add Task</button>
            <h2>Added Task</h2>
            <ul>
               ${taskAdded(tasks)}
            </ul>
            <button formaction="./removetask" type="submit">Remove</button>
         </form>
         <h2>Completed task</h2>
         <ul>
            ${tasksCompleted(completedTasks)}
         </ul>
      </div>
   </body>
</html>
`

export { baseHtml }