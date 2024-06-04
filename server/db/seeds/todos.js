/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    { id: 1, colName: 'Vaccume Driveway', complete: false },
    { id: 2, colName: 'Iron clothes inside out', complete: false },
    { id: 3, colName: 'Write love letter to my toster', complete: false },
    { id: 4, colName: 'Teach goldfish a new trick', complete: false },
    { id: 5, colName: 'fold the fittered sheets', complete: false },
    {
      id: 6,
      colName: 'Organize sock drawer by color and smell.',
      complete: false,
    },
    { id: 7, colName: 'Dust all furniture with oven mitts', complete: false },
    {
      id: 8,
      colName: 'Organize pantry alphabetically by color',
      complete: false,
    },
    { id: 9, colName: 'Polish silver with banana', complete: false },
    {
      id: 10,
      colName: 'Clean windows with Muffy the sock puppet.',
      complete: false,
    },
  ])
}
