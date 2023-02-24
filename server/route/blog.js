const express = require('express');
const router = express.Router()
const {create, getAllblogs,singleBlog,deleteBlog,updateBlog} = require('../controller/BlogController');

router.post('/create',create)
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',deleteBlog)
router.put('/blog/:slug',updateBlog)

module.exports = router