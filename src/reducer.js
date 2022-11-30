import { Reducer } from "redux";
import * as actions from "./actions";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

function reducer(
  state = {
    users: [
      {
        id: uuidv4(),
        name: "cat",
        email: "cat@mail.com",
        pass: "cat",
        regTime: "Nov 20, 2022, 10:00:00 AM",
        authTime: "Nov 21, 2022, 10:00:00 AM",
        checked: false,
        blocked: false,
      },
      {
        id: uuidv4(),
        name: "admin",
        email: "admin@mail.ru",
        pass: "admin",
        regTime: "Nov 20, 2022, 12:00:00 AM",
        authTime: "Nov 21, 2022, 12:00:00 AM",
        checked: false,
        blocked: false,
      },
    ],
    loggedIn: null,
  },
  action
) {
  switch (action.type) {
    case actions.LOGIN:
      const loggingUser = state.users.find((user) => {
        return user.name === action.payload.username;
      });
      let auth = Date.now();
      const authT = format(new Date(auth), "PPpp");

      if (!loggingUser) {
        return state;
      }

      let data = state.users;
      const idx = state.users.findIndex(
        (el) => el.name === action.payload.username
      );
      const newItem = { ...loggingUser, authTime: authT };

      const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];

      const loggedIn =
        loggingUser.pass === action.payload.pass && !loggingUser.blocked
          ? loggingUser
          : null;
      return { ...state, users: newArray, loggedIn: loggedIn };
    case actions.LOGOUT:
      return { ...state, loggedIn: false };
    case actions.REG:
      let reg = Date.now();
      const result = format(new Date(reg), "PPpp");
      let user = {
        id: uuidv4(),
        regTime: result,
        ...action.payload,
      };
      state.users.push(user);
      return { ...state };

    case actions.CHECK:
      let data1 = state.users;
      const idx1 = state.users.findIndex((el) => el.id === action.payload.id);
      const oldItem = data1[idx1];
      const newItem1 = { ...oldItem, checked: !oldItem.checked };

      const newArray1 = [
        ...data1.slice(0, idx1),
        newItem1,
        ...data1.slice(idx1 + 1),
      ];

      return { ...state, users: newArray1 };

    case actions.CHECKALL:
      let data2 = state.users;
      const newArray2 = data2.map((user) => {
        return { ...user, checked: !state.allChecked };
      });
      return { ...state, users: newArray2, allChecked: !state.allChecked };

    case actions.DELETE:
      let filteredUsers = state.users.filter((user) => {
        return user.checked === false;
      });

      if (!filteredUsers.find((user) => user.id === state.loggedIn.id)) {
        return { ...state, users: filteredUsers, loggedIn: null };
      }

      return { ...state, users: filteredUsers };
    case actions.BLOCK:
      const blockedUsers = state.users.map((user) => {
        if (user.checked) {
          return { ...user, blocked: true, checked: false };
        } else {
          return { ...user, checked: false };
        }
      });

      let findUser = blockedUsers.find((user) => user.id === state.loggedIn.id);
      if (findUser.blocked) {
        return { ...state, users: blockedUsers, loggedIn: null };
      }

      return { ...state, users: blockedUsers };

    case actions.UNBLOCK:
      const unblockedUsers = state.users.map((user) => {
        if (user.checked) {
          return { ...user, blocked: false, checked: false };
        } else {
          return { ...user, checked: false };
        }
      });
      return { ...state, users: unblockedUsers };

    default:
      return state;
  }
}

export default reducer;
