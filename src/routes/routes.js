const { Router } = require('express')
const Authenticate = require('../helpers/authMiddleware')
const SingleCanvasController = require('../controllers/SingleCanvasController')
const MultiCanvasController = require('../controllers/MultiCanvasController')
const ItemController = require('../controllers/ItemController')
const SessionController = require('../controllers/SessionController')

const routes = Router()

routes.post('/canvas', SingleCanvasController.createCanvas)
routes.get('/canvas/:canvas_id', Authenticate, SingleCanvasController.listCanvas)
routes.delete('/canvas/:canvas_id', Authenticate, SingleCanvasController.deleteCanvas)
routes.patch('/canvas/:canvas_id', Authenticate, SingleCanvasController.updatedCanvas)

routes.get('/canvas', MultiCanvasController.listCanvas)

routes.post('/canvas/:canvas_id/items', Authenticate, ItemController.createItem)
routes.get('/canvas/:canvas_id/items', Authenticate, ItemController.listItems)
routes.delete('/canvas/:canvas_id/items/:item_id', Authenticate, ItemController.deleteItem)

routes.post('/sessions', SessionController.createSession)

module.exports = routes