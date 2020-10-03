const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Canvas = require('../models/Canvas')

const SECRET_KEY = process.env.SECRET_KEY
const EXPIRATION_TIME = '1h'

module.exports = {
    async createSession(req, res) {
        const data = req.body
        const { email, password } = data

        try {
            const existingEmail = await Canvas.findOne({
                email: email
            })
            if (!existingEmail) return res.status(404).send('Canvas does not exist')

            const validPassword = await bcrypt.compare(password, existingEmail.password)              
            if (!validPassword) return res.status(401).send('Invalid password')

            const userData = existingEmail

            userData.password = undefined

            const USER_PAYLOAD = { 
                user_id: userData._id,
                user_email: userData.email,
                user_name: userData.name
            }        

            const token = jwt.sign({ USER_PAYLOAD }, SECRET_KEY, { expiresIn: EXPIRATION_TIME }) 

            return res.status(200).send({ userData, token })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}