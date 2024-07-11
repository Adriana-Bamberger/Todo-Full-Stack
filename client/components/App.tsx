import AddTodo from './AddTodo.tsx'
import TaskList from './TaskList.tsx'
import { fetchTodos } from '../apis/apiClient.ts'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: todos,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  })
  if (isError) {
    return error
  }
  if (isFetching) {
    return <p> ..Loading</p>
  }
  if (todos) {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
          <TaskList todos={todos} />
        </header>
        <section className="main"></section>
    
      </>
    )
  }
}

export default App
