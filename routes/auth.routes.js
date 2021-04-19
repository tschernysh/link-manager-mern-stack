const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require(('../models/User'))
const router = Router()

router.post(
    '/register',
    // validators array
    [
        check('email', 'Email is invalid').isEmail(),
        check('password', 'Password must be at least 8 symbols length')
            .isLength({min: 8})
    ],
    async (req, res) => {
        try {
            console.log(req.body);
            //validator check
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Bad credentials'
                })
            }

            
            
            const { email, password } = req.body
            
            const prospect = await User.findOne({ email })

            if (prospect) {
                return res.status(400).json({ message: 'User is already exist\'s' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'User has been created' })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong :( ' })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Bad credentials'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            
            if(!user){
                return res.status(400).json({message: 'User is not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message: 'Wrong password, try again'})
            }
            //creating JsonWebToken
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({ token, userId: user.id, message: 'Access approved'})

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong :( ' })
        }
    })

module.exports = router