import request from 'superagent'
import { Task, TaskData } from '../../models/tasks'

const rootUrl = '/api/v1/todos'

export async function fetchTodos(): Promise<Task[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function addTodo(todo: string) {
  console.log("I'm the api: ", todo)

  const newTask: TaskData = {
    task: todo,
    completed: false,
  }

  await request.post(rootUrl).send(newTask)
}

export async function updateTodo(updatedTodo: string, id: number) {
  await request.patch(`${rootUrl}${id}`).send(updatedTodo)
}
//   await request.post(rootUrl).send({ task: todo })
//   return Promise.resolve(todo)
// }
