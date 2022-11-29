import "./Login.css";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../src/actions";

const Login = (props) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  if (props.loggedIn) {
    return <Navigate to="/admin" />;
  }
  return (
    <div className="login input-group mb-3">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        className="form-control login__input"
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className="form-control login__input"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <button
        className="btn btn-primary login__button"
        onClick={() => props.login(username, password)}
      >
        Login
      </button>
      <button className="btn btn-link login__reg">
        <NavLink to="/registration">Registration</NavLink>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, actions)(Login);
