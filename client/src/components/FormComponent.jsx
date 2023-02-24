import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    photo: "",
  });
  const { title, author, photo } = state;

  const [content, setContent] = useState('')

  const HandleOnChange = (name) => (event) => {
    setState({...state,[name]:event.target.value});
  };

  const submitContent = (event) => {
    setContent(event)
  }

  const HandleSubmitForm = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/create`,{ title, content, author, photo })
    .then(reaponse =>{
      Swal.fire(
        'Complete',
        'Data saved.',
        'success'
      )
      setState({...state,title:"", author:"", photo:""})
      setContent('')
    }).catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${err.response.data.error}`,
      })
    })
  }

  return (
    <div className="container p-5">
    <Navbar/>
      <h1>Share your moment.</h1>
      <form onSubmit={HandleSubmitForm}>
        <div className="form-group">
          <label>Entry Title</label>
          <input type="text" className="form-control" value={title} onChange={HandleOnChange("title")}/>
        </div>
        <div className="form-group">
          <label>Tell your story here.</label>
          <ReactQuill 
          value={content}
          onChange={submitContent}
          theme="snow"
          />
          </div>
        <div className="form-group">
          <label>Writer</label>
          <input type="text" className="form-control" value={author} onChange={HandleOnChange("author")}/>
        </div>
        <div className="form-group">
          <label>Insert picture</label>
          <input type="file" className="form-control" value={photo} onChange={HandleOnChange("photo")}/>
        </div>
        <br />
        <input
          type="submit"
          value="Save Diary"
          className="btn btn-success p-2"
        />
      </form>
    </div>
  );
};

export default FormComponent;
