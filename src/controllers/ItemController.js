const Item = require('../models/Item')
const Canvas = require('../models/Canvas')
const checkId = require('../helpers/checkId')

module.exports = {
    async listItems(req, res) {
        const dataParams = req.params

        const { canvas_id } = dataParams

        const { USER_PAYLOAD } = req.user

        const isIdChecked = checkId(canvas_id, USER_PAYLOAD.user_id)
        if (!isIdChecked) return res.status(403).send('Forbidden')
        
        try {
            const canvasExist = await Canvas.findById(canvas_id)
            if (!canvasExist) return res.status(404).send('Canvas does not exist')

            const foundCanvas = await Item.find({ canvas: canvas_id })
            
            return res.status(200).send(foundCanvas)
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async createItem(req, res) {
        const dataBody = req.body
        const dataParams = req.params

        const { type, description } = dataBody
        const { canvas_id } = dataParams

        const { USER_PAYLOAD } = req.user

        const isIdChecked = checkId(canvas_id, USER_PAYLOAD.user_id)
        if (!isIdChecked) return res.status(403).send('Forbidden')

        try {
            const canvasExist = await Canvas.findById(canvas_id)
            if (!canvasExist) return res.status(404).send('Canvas does not exist')

            const createdItem = await Item.create({ type, description, canvas: canvas_id })           

            await createdItem.populate('canvas').execPopulate()

            return res.status(201).send(createdItem)
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    
    async deleteItem(req, res) {
        const dataParams = req.params

        const { canvas_id, item_id } = dataParams  
        
        const { USER_PAYLOAD } = req.user

        const isIdChecked = checkId(canvas_id, USER_PAYLOAD.user_id)
        if (!isIdChecked) return res.status(403).send('Forbidden')

        try {    
            const canvasExist = await Canvas.findById(canvas_id)
            if (!canvasExist) return res.status(404).send('Canvas does not exist')
            
            const deletedItem = await Item.findByIdAndRemove(item_id)           

            return res.status(200).send(deletedItem)
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}