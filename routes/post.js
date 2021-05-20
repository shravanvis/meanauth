const express = require('express');
const postSchema = require('../models/postSchema');
const router = express.Router();
const User = require('../models/userSchema')

router.post('/', (req,res)=>{
    const newPost = new Post({
        title: req.body.title
    })

    newPost.save()
    .then(post => {
        res.send(post);
    })
    .catch(error => {
        res.status(400).json({ message: error.message })
    })
})

router.get('/', (req,res)=>{
    postSchema.find()
    .then(post => {
        res.send(post);
    })
    .catch(error => {
        res.status(400).json({ message: error.message })
    })
})

// post posted by user

router.post('/:userid', async (req,res)=>{

    const user = await User.findOne({_id: req.params.userid})

    // const post = new Post();
    // post.title = req.body.title
    // post.user = user._id
    // await post.save();

    const newPost = new postSchema({
        title: req.body.title,
        postedBy: user._id
    })
    await newPost.save()
    .then(newPost=>{
        res.status(200).json({ message: 'successfully posted', result: newPost})
    })
    .catch(error=>{
        res.status(400).json({ message: error.message })
    })
    
    user.post.push(newPost._id)
    await user.save();

    res.send(newPost);
})

module.exports = router