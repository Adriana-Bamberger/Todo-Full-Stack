import connection from './connection'
import { Task, TaskData } from '../../models/tasks'

export function getAllTasks(): Promise<Task[]> {
  return connection('todos').select()
}

export function getTaskById(id: number): Promise<Task> {
  return connection('todos').where({ id }).first()
}

export function createTask(newTask: TaskData) {
  return connection('todos').insert(newTask)
}

export function deleteTodo(id: number) {
  return connection('todos').where({ id }).delete()
}

export async function updateTask(updatedTask: Task) {
  const { id, task, completed } = updatedTask
  const newTask = await connection('locations')
    .where({ id })
    .update({ task, completed })
  return newTask
}
