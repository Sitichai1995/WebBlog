import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import renderHTML from "react-render-html";

const SingleComponent = (props) =>{
    const [blog, setBlog] = useState('')

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response => {
            setBlog(response.data)
        })
        .catch(err =>alert(err))
         // eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
        <Navbar/>
       {blog && <div>
        <h1>{blog.title}</h1>
        <div>{renderHTML(blog.content)}</div>
        <p className="text-muted">writer: {blog.author}</p>
          <p className="text-muted">Date: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>}
        </div>
    )
}

export default SingleComponent;