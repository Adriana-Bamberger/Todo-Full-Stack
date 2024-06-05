/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'Vaccume Driveway', completed: false },
    { id: 2, task: 'Iron clothes inside out', completed: false },
    { id: 3, task: 'Write love letter to my toster', completed: false },
    { id: 4, task: 'Teach goldfish a new trick', completed: false },
    { id: 5, task: 'fold the fittered sheets', completed: false },
    {
      id: 6,
      task: 'Organize sock drawer by color and smell.',
      completed: false,
    },
    { id: 7, task: 'Dust all furniture with oven mitts', completed: false },
    {
      id: 8,
      task: 'Organize pantry alphabetically by color',
      completed: false,
    },
    { id: 9, task: 'Polish silver with banana', completed: false },
    {
      id: 10,
      task: 'Clean windows with Muffy the sock puppet.',
      completed: false,
    },
  ])
}
