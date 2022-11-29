import "./Admin.css";
import { NavLink, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../src/actions";

const Admin = (props) => {
  if (!props.loggedIn) {
    return <Navigate to="/" />;
  }

  const elements = props.users.map((user) => {
    return (
      <tr key={user.id}>
        <td>
          <input
            type="checkbox"
            checked={user.checked}
            onChange={() => props.check(user.id)}
          />
        </td>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.regTime}</td>
        <td>{user.authTime}</td>
        <td>{user.blocked ? "Blocked" : "Active"}</td>
      </tr>
    );
  });
  return (
    <div className="admin">
      <div className="admin__header">
        <div className="admin__btn-group">
          <button
            className="btn btn-primary admin__delete-btn"
            onClick={() => props.deleteUser()}
          ></button>
          <button
            className="btn btn-primary admin__lock-btn"
            onClick={() => props.blockUser()}
          ></button>
          <button
            className="btn btn-primary admin__unlock-btn"
            onClick={() => props.unblockUser()}
          ></button>
        </div>
        <div className="admin__btn-logout">
          <button className="btn btn-primary" onClick={() => props.logout()}>
            <NavLink className="sign-out-btn" to="/">
              Sign out
            </NavLink>
          </button>
        </div>
      </div>
      <table class="table admin__table">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                checked={props.checkedAll}
                onChange={() => props.checkAll()}
              />
            </th>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Registered</th>
            <th scope="col">Authorized</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loggedIn: state.loggedIn,
    checkedAll: state.checkedAll,
  };
};

export default connect(mapStateToProps, actions)(Admin);
