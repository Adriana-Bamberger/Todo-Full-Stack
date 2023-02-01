const express = require('express')

const db = require('../db')

const router = express.Router()
module.exports = router

// GET /locations
router.get('/', (req, res) => {
  db.getAllLocations()
    .then((locations) => {
      const viewData = { locations }
      res.render('showLocations', viewData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// GET /locations/4/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  db.getLocationById(id)
    .then((location) => {
      const viewData = location
      res.render('editLocation', viewData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// POST /locations/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  const { id, name, description } = req.body

  db.updateLocation({ id, name, description })
    .then(() => {
      res.redirect('/locations')
    })
    .catch((err) => {
      console.log(err)
    })
})

// GET /locations/add
router.get('/add', (req, res) => {
  res.render('addLocation')
})

// POST /locations/add
router.post('/add', (req, res) => {
  const { name, description } = req.body
  db.addLocation({ name, description })
    .then(() => {
      res.redirect('/locations')
    })
    .catch((err) => {
      console.log(err)
    })
})

// POST /locations/delete
router.post('/delete', (req, res) => {
  const { id } = req.body
  db.deleteLocation(id)
    .then(() => {
      res.redirect('/locations')
    })
    .catch((err) => {
      console.log(err)
    })
})
