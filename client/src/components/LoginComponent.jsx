import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenicate } from "../services/authorize"
import {withRouter}from "react-router-dom"

const LoginComponent = (props) => {
    const [state, setState] = useState({
        username: "",
        password: ""
      });
      const { username, password } = state;

      const HandleOnChange = (name) => (event) => {
        setState({...state,[name]:event.target.value});
      };

      const HandleSubmitForm = (e) => {
        e.preventDefault();
        //ระบุการทำงานของ axios ว่าเป็นแบบไหน (`${url}, ส่งค่าแบบไหนไปให้ทำงาน)
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        //.then รับค่า reponse ที่ได้จาก api จากการทำงาน
        .then(response =>{
          authenicate(response,()=>props.history.push("/create"));
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `${err.response.data.error}`,
          })
        })
      }

  return (
    <div className="container-md">
      <Navbar/>
      <h1>Register</h1>
      <form onSubmit={HandleSubmitForm}>
        <div className="mb-3">
          <label className="form-label">
            username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={username}
            onChange={HandleOnChange("username")}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={HandleOnChange("password")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default withRouter(LoginComponent);
