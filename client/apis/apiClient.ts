import request from 'superagent'

export async function fetchTodos() {
  const FakeToDo = [
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

  return FakeToDo
}

export async function addTodo(todo: string) {
  return Promise.resolve(todo)
}
