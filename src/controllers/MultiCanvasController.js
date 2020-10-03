const Canvas = require('../models/Canvas')

module.exports = {
    async listCanvas(req, res) { 
        const dataQuery = req.query

        const page = dataQuery.page || 1
        const limit = dataQuery.limit || 5       
        
        try {
            const allCanvas = await Canvas.find()
                .limit(+limit)
                .skip(+limit*(+page-1))                
                
            return res.status(200).send(allCanvas)
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}