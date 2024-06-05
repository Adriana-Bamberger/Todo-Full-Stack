import { Task } from '../../models/tasks'

interface Props {
  todos: Task[]
}
export default function ToDoList({ todos }: Props) {
  return (
    <>
      <div>To Do List</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </>
  )
}
