import { Router } from 'express'
import * as db from '../db/dbfunctions'

const router = Router()

// Gets all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()
    res.json(tasks)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

// Gets task by id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const task = await db.getTaskById(id)
    res.json(task)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

// Making new Tast
router.post('/', async (req, res) => {
  try {
    const newTask = req.body
    await db.createTask(newTask)
    res.sendStatus(201)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})
// Deletes a todo
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTodo(id)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

// Updates a task
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updateData = {
      id,
      ...req.body,
    }
    const updatedTask = await db.updateTask(updateData)

    if (updatedTask) {
      res.json(updatedTask)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(`database error: ${error}`)
    next(error)
  }
})
export default router
