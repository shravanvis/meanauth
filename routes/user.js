const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Post = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// post for first user
router.post('/user/signup', (req,res)=>{
    bcrypt.hash(req.body.password, 10, (err,hashedPass)=>{
        if(err){
            res.json({ error: err })
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
    
        newUser.save()
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            res.status(400).json({ message: error.message })
        })
    })
})  


router.post('/post/id/:id', (req,res)=>{
    _id: req.params.id;
    // create a post and saving
    const post = new Post({
        title: req.body.title,
        postedBy: _id,
        comments: [
            {
                text: req.body.comments[0].text,
                postedBy: req.body.postedByUserId
            }
        ]
    })

    post.save()
    .then(post=>{
        res.send(post)
    })
    .catch(error=>{
        res.status(400).json({ message: error.message })
    })
})

router.post('/user/login', (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, {password: password})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, (err,result)=>{
                if(err){
                    res.json({ error: err })
                }
                if(result){
                    let token = jwt.sign({ name: user.name }, 'verysecretvalue', {expiresIn: '1h'});
                    res.status(200).json({ success: 1, message: 'login Successfull', token: token, user_id: user.id })
                }
                else{
                    res.json({ message: 'password does not match' })
                }
            })
        }
        else{
            res.json({ success: 0, message: 'No user found' })
        }
    })
    .catch(error=>{
        res.status(400).json({ message: error.message })
    })
})

router.get('/user/:id', (req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        res.status(200).json({ message: 'User found', result: user })
    })
    .catch(error=>{
        res.status(400).json({ message: error.message })
    })
})

router.get('/users', (req,res)=>{
    User.find()
    .then(user=>{
        res.status(200).json({ message: 'all Users', result: user })
    })
    .catch(error=>{
        res.status(400).json({ message: error.message })
    })
})

module.exports = router;