const express = require('express');
const router = express.Router();
const Blog = require('./../models/Blogs');

// Getting All Blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

// Getting Single Blog
router.get('/:id', async (req, res) => {
    const blog = await Blog.findById({ _id: req.params.id });
    res.json(blog);
});

// Creating New Blog
router.post('/new', async (req, res) => {
    // Checking the blog title is already taken or not
    const blog = await Blog.findOne({ title: req.body.title });

    if (blog) {
        res.json(`The title '${req.body.title}' is already taken. Please try another title.`);
    } else {
        const newBlog = new Blog(req.body);
        const result = await newBlog.save();
        res.json(result);
    }
});

// Updating Blog
router.patch('/update/:id', async (req, res) => {
    const updateBlog = await Blog.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json(updateBlog);
});

// Deleting Blog
router.delete('/delete/:id', async (req, res) => {
    const blog = await Blog.findByIdAndDelete({ _id: req.params.id });
    res.json(blog);
});

module.exports = router;