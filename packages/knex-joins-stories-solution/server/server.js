const { join } = require('node:path')

const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes')

const server = express()

module.exports = server

// Middleware

server.use(express.urlencoded({ extended: true }))
server.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
)
server.set('view engine', 'hbs')
server.set('views', join(__dirname, 'views'))
server.use(express.static('public'))

// Routes

server.use('/', routes)
