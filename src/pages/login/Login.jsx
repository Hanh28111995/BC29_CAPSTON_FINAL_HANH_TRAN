import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constants/common";
import { loginAPI } from "services/user";
import { setUserInfoAction } from "../../store/actions/user.action";
import { notification } from "antd";
import './index.scss'

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    passWord: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginAPI(state);
      console.log(result)
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(result.data.content));
      dispatch(setUserInfoAction(result.data.content));
      notification.success({
        description: ` Log in success`,
      })
      navigate("/project-management");
    }
    catch (err) {
      notification.warning({
        description: `${err.response.data.content}`,
      });
    }
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          {/* Brand/logo */}
          <a className="navbar-brand" href="#">
            <img src="https://wac-cdn.atlassian.com/dam/jcr:e348b562-4152-4cdc-8a55-3d297e509cc8/Jira%20Software-blue.svg?cdnVersion=535" alt="logo" style={{ height: '28px' }} />
          </a>
          {/* Links */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn btn-signup" >
                <a className="nav-link" href="/register">Sign Up</a>
              </button>
            </li>

          </ul>
        </nav>
      </header>
      <section>
        <div className="row col-12 container-fluid ">
          <div className="col-6 login-component-1">
            <div className="p-content w-75">
              <h2>The #1 software development tool used by agile teams</h2>
              <p>EACH PRODUCT ON A FREE PLAN:</p>
              <ul>
                <li className="featured">
                  <p><i className="fa-solid fa-check"></i>&ensp;Supports up to 10 users</p>
                </li>
                <li className="featured">
                  <p><i className="fa-solid fa-check"></i>&ensp;Includes 2 GB storage</p>
                </li>
                <li className="featured">
                  <p><i className="fa-solid fa-check"></i>&ensp;Offers Community support</p>
                </li>
                <li className="featured">
                  <p><i className="fa-solid fa-check"></i>&ensp;Is always free, no credit card needed</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 login-component-2">
            <div className="form-content mx-auto">
              <form className="w-75 mx-auto my-5" onSubmit={handleSubmit}>
                <h2 className="text-center mb-3">Welcome</h2>
                <div className="form-group">
                  <label>Work email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span><i className="fa-solid fa-user" style={{color:'navy'}}></i></span>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="passWord"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span><i className="fa-solid fa-lock" style={{color:'navy'}}></i></span>
                </div>
                <button className=" my-3 btn btn-primary w-100">LOGIN</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );

}
