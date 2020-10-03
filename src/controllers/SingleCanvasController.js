const bcrypt = require('bcryptjs')
const checkId = require('../helpers/checkId')

const Canvas = require('../models/Canvas')
const Item = require('../models/Item')

module.exports = {
    async createCanvas(req, res) {        
        const data = req.body 
        const { email, password, name, uf, city, phone, description, exists } = data         
        
        try {  
            const existingCanvas = await Canvas.findOne({ email })            
            if (existingCanvas) return res.status(409).send('Canvas already exists')

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)            
            
            const createdCanvas = await Canvas.create({ 
                email, 
                password: hashedPassword, 
                name, 
                uf, 
                city, 
                phone, 
                description, 
                exists 
            })
            
            return res.status(201).send(createdCanvas)
        } catch(err) {
            return res.status(400).send(err)            
        }               
    },

    async listCanvas(req, res) {        
        const data = req.params
        const { canvas_id } = data  
        
        const { USER_PAYLOAD } = req.user

        const isIdChecked = checkId(canvas_id, USER_PAYLOAD.user_id)
        if (!isIdChecked) return res.status(403).send('Forbidden')        
       
        try {          
            const foundCanvas = await Canvas.findById(canvas_id) 
            if (!foundCanvas) return res.status(404).send('Canvas not found')
            
            foundCanvas.password = undefined

            return res.status(200).send(foundCanvas)
        } catch(err) {
            return res.status(400).send(err) 
        }
    },

    async deleteCanvas(req, res) {
        const data = req.params
        const { canvas_id } = data

        const { USER_PAYLOAD } = req.user

        const isIdChecked = checkId(canvas_id, USER_PAYLOAD.user_id)
        if (!isIdChecked) return res.status(403).send('Forbidden')
        
        try {
            const foundCanvas = await Canvas.findById(canvas_id)
            if (!foundCanvas) return res.status(404).send('Canvas not found')

            const deletedItems = await Item.remove({ canvas: canvas_id })
           
            const deletedCanvas = await Canvas.findByIdAndRemove(canvas_id)

            return res.status(200).send({ deletedCanvas, deletedItems })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async updatedCanvas(req, res) {
        const paramsData = req.params
        const bodyData = req.body

        const { canvas_id } = paramsData 
        const { email, password } = req.body  
        
        const { USER_PAYLOAD } = req.user
        
        const isIdChecked = checkId(canvas_id, USER_PAYLOAD.user_id)
        if (!isIdChecked) return res.status(403).send('Forbidden')
               
        try {
            const existingCanvas = await Canvas.findOne({ email })
            if (existingCanvas) return res.status(409).send('Canvas already exists')             

            let hashedPassword = null

            if (password) {
                const salt = await bcrypt.genSalt(10)
                hashedPassword = await bcrypt.hash(password, salt)
            } else {
                const userPassword = await Canvas.findById(canvas_id)
                hashedPassword = userPassword.password
            }        
            
            const updatedCanvas = await Canvas.findByIdAndUpdate(canvas_id, { 
                ...bodyData, 
                password: hashedPassword 
            }, {
                new: true
            })

            return res.status(200).send(updatedCanvas)
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}
