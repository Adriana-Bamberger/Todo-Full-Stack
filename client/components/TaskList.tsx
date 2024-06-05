export default function TaskList() {
  const fakeToDos = [
    {
      id: 1,
      task: 'Vaccume Driveway',
      completed: 0,
    },
    {
      id: 2,
      task: 'Iron clothes inside out',
      completed: 0,
    },
    {
      id: 3,
      task: 'Write love letter to my toster',
      completed: 0,
    },
    {
      id: 4,
      task: 'Teach goldfish a new trick',
      completed: 0,
    },
    {
      id: 5,
      task: 'fold the fittered sheets',
      completed: 0,
    },
  ]
  return (
    <>
      <div>ToDo List</div>
      <ul>
        {fakeToDos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </>
  )
}
