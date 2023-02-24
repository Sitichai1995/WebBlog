//connect database / process with database
const slugify = require('slugify');
const Blogs = require("../Models/blogs")
const { v4: uuidv4 } = require('uuid');
//save Data
exports.create = (req,res)=>{
    const {title,content,author,photo}=req.body
    let slug = slugify(title)

    //validate data
    if(!slug)slug = uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({error:"Please input title"})
            break;
        case !content:
            return res.status(400).json({error:"Please input content"})
            break;
    }
    // save data
    Blogs.create({title,content,author,photo,slug},(err,blog) => {
        if(err) {
            res.status(400).json({error:"Title is invalid!"})
        }
        res.json(blog)
    })
}

// Get blog
exports.getAllblogs = (req,res) => {
    Blogs.find({}).exec((err,blogs) => {
        res.json(blogs)
    })
}

//get blog by using slug
exports.singleBlog = (req, res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog) => {
        res.json(blog)
    })
}

//delete blog by using slug
exports.deleteBlog = (req, res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err, blog) => {
        if (err) console.log(err)
        res.json({
            message:"Delete blog completed"
        })
    })
}

//update blog by using slug
exports.updateBlog = (req, res) => {
    const {title,content,author,photo}=req.body
    const {slug} = req.params
    Blogs.findOneAndUpdate({slug},{title, content, author, photo},{new:true}).exec((err, blog) => {
        if (err) console.log(err)
        res.json(blog)
    })
}