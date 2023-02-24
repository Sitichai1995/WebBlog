import Navbar from "./components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import renderHTML from "react-render-html";

function App() {
  const[blogs, setBlogs] = useState([])

  const fetchData = () =>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response => {
      setBlogs(response.data)
    })
    .catch(err => alert(err))
  }

  useEffect(()=>{
    fetchData();
  },[])

  const confirmDelete = (slug) =>{
    Swal.fire({
      title: "Are you sure you want to delete ?",
      icon:"warning",
      showCancelButton: true
    }).then((result) => {
      if(result.isConfirmed){
        //send request to api for delete data
        removeBlog(slug);
      }
    })
  }

  const removeBlog = (slug) =>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then(response =>{
      Swal.fire("Deleted!",response.data.message,"success")
      fetchData()
    }).catch(err =>{
      console.log(err)
    })
    
  }

  return (
    <div className="App p-5">
    <Navbar/>
    <div className="card mb-3">
    {blogs.map((blog, index) =>(
      <div className="row g-0" key={index}>
        <div className="col-md-4">
        
        </div>
        <div className="col-md-8 pb-4">
        <Link to = {`/blog/${blog.slug}`}>
            <h2 className="fs-2">{blog.title}</h2>
          </Link>
          <div className="pt-3">{renderHTML(blog.content.substring(0,180))}</div>
          <p className="text-muted">writer: {blog.author}</p>
          <p className="text-muted">Date: {new Date(blog.createdAt).toLocaleString()}</p> 

            <Link className="btn btn-outline-primary" to = {`/blog/edit/${blog.slug}`}>Update</Link>
          &nbsp;
          <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>Delete</button>
        </div>
          
        </div>
      
    ))}
    </div>
    
    </div>
  );
}

export default App;
