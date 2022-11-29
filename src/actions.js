export const LOGIN = "LOGIN";
export const login = (username, pass) => {
  return { type: LOGIN, payload: { username, pass } };
};

export const LOGOUT = "LOGOUT";
export const logout = () => {
  return { type: LOGOUT };
};

export const REG = "REG";
export const register = (name, email, pass) => {
  return { type: REG, payload: { name, email, pass } };
};

export const CHECK = "CHECK";
export const check = (id) => {
  return { type: CHECK, payload: { id } };
};

export const CHECKALL = "CHECKALL";
export const checkAll = () => {
  return { type: CHECKALL };
};

export const DELETE = "DELETE";
export const deleteUser = () => {
  return { type: DELETE };
};

export const BLOCK = "BLOCK";
export const blockUser = () => {
  return { type: BLOCK };
};

export const UNBLOCK = "UNBLOCK";
export const unblockUser = () => {
  return { type: UNBLOCK };
};
