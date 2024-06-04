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
