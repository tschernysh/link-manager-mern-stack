const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortId = require('shortid')
const router = Router()

router.post('/generate', auth  ,async (req, res) => {
    console.log(req)
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortId.generate()
        const existing = await Link.findOne({from})

        if (existing){
            return res.status(400).json({message: 'Link is already exists'})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({link , message: 'Link successfully created'})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong :( '})
    }
})

router.get('/', auth ,async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong :( '})
    }
})

router.get('/:id', auth , async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong :( '})
    }
})

module.exports = router
