const express = require('express')
const router = express.Router()
const { Posts } = require("../models")
const { validateToken } = require("../middlewares/auth"); // to check if token is correct or is hack


// get all posts
router.get('/', async (req, res) => {
    const allPosts = await Posts.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
    res.json(allPosts)
})

// add post to datapase
router.post('/', validateToken, async (req, res) => {
    try{
        const post = await req.body
        post.username = req.user.username;
        Posts.create(post)
        res.json(post)
    }
    catch (err){
        return res.json({ error: err });
    }
})


module.exports = router