import "./Registration.css";
import { useState } from "react";
import { connect, dispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as actions from "../../src/actions";

const Registration = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  let navigate = useNavigate();

  return (
    <div className="reg input-group mb-3">
      <h1>Registration</h1>
      <input
        type="text"
        name="username"
        className="form-control reg__input"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        className="form-control reg__input"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className="form-control reg__input"
        placeholder="Password"
        onChange={handleChange}
      />
      <button
        className="btn btn-primary reg__button"
        onClick={() => {
          props.register(username, email, password);
          navigate("/");
        }}
      >
        Register
      </button>
      <button className="btn btn-link login__button">
        <NavLink to="/">Already have an account?</NavLink>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, actions)(Registration);
