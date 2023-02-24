import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditComponent = (props) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    photo: "",
    slug: "",
  });
  const { title, author, photo, slug } = state;
  
  const [content, setContent] = useState('')
  const submitContent = (event) => {
    setContent(event)
  }

  const HandleOnChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const HandleSubmitForm = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{ title, content, author, photo })
    .then(response =>{
      Swal.fire(
        'Complete',
        'Update data saved.',
        'success'
      )
      const {title,content,author,photo,slug} = response.data
      setState({...state,title, author, photo,slug})
      setContent(content)
    }).catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${err.response.data.error}`,
      })
    })
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, author, photo, slug } = response.data;
        setState({ ...state, title, author, photo, slug });
        setContent(content);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, []);

  const showupdateform = () => (
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
          value="update"
          className="btn btn-success p-2"
        />
      </form>
  )

  return (
    <div className="container p-5">
      <Navbar />
      <h1>Edit Diary.</h1>
      {showupdateform()}
    </div>
  );
};

export default EditComponent;
