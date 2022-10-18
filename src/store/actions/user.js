import { getCookie, logout } from "../../utils/config";
import { ref, set, push, get } from "firebase/database";
import { firebase } from "../../database/config";
import { getDatabase } from "firebase/database";

//#region - INITIALIZE
const database = getDatabase(firebase);
const userRef = ref(database, "users/");
//#endregion

//#region - AUTH
let token = getCookie("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//#endregion

//#region - DISPATCH
const request = (type) => {
  return {
    type,
    isLoading: true,
  };
};

const success = (type, result) => {
  return {
    type,
    payload: result,
    isLoading: false,
  };
};

const failure = (type) => {
  return {
    type,
    isLoading: false,
  };
};

export const clear = (type) => {
  return {
    type,
    isLoading: false,
  };
};

export function addUser(user) {
  return {
    type: "Add_USER",
    user,
  };
}

export function signinUser(user) {
  return {
    type: "LOGIN_USER",
    user,
  };
}
//#endregion

//#region - GET
/**
 * Get logged in user object properties
 * @returns {object} - user object
 * */
export const getUserObject = () => {
  return async (dispatch) => {
    try {
      dispatch(request("CURRENT_USER_REQUEST"));
      const result = await get(userRef).then((snapshot) => {
        const data = snapshot.val() || {};
        var array = Object.keys(data).map((k) => {
          data[k].key = k;
          return data[k];
        });

        const found = array.find((o) => o.id === parseInt(token));
        return found;
      });

      dispatch(success("CURRENT_USER_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }

      dispatch(failure("CURRENT_USER_FAILURE"));
    }
  };
};

/**
 * Get All Users
 * @returns {object<array>} users array
 */
export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(request("USERS_REQUEST"));

      const result = await get(userRef).then((snapshot) => {
        const data = snapshot.val() || {};
        var array = Object.keys(data).map((k) => {
          data[k].key = k;
          return data[k];
        });
        return array;
      });

      dispatch(success("USERS_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }

      dispatch(failure("USERS_FAILURE"));
    }
  };
};

/**
 * Get user's properties
 *
 * @returns {object} user
 */
export const getUserById = ({ id }) => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_USER_REQUEST"));
      const result = await get(userRef).then((snapshot) => {
        const data = snapshot.val() || {};
        var array = Object.keys(data).map((k) => {
          data[k].key = k;
          return data[k];
        });

        const found = array.find((o) => o.id === parseInt(id));
        return found;
      });
      dispatch(success("FETCH_USER_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("FETCH_USER_FAILURE"));
    }
  };
};

//#endregion

//#region - REGISTER
/**
 * Register new user
 * @param {String} fullName
 * @param {String} email
 * @param {String} password
 * @returns {Object}
 */
export const registerUser = ({ name, email }) => {
  return async (dispatch) => {
    const id = new Date().getTime();
    const user = { id, name, email };

    const processRegister = await get(userRef).then((snapshot) => {
      const data = snapshot.val() || {};
      var array = Object.keys(data).map((k) => {
        return data[k];
      });

      let found = array.find((o) => o.email === email);
      if (!found) {
        const newUserRef = push(userRef);
        set(newUserRef, user);
        dispatch(addUser(user));

        return user;
      } else {
        alert("User already exists");
        return;
      }
    });

    return processRegister;
  };
};
//#endregion

//#region - EDIT/DELETE
/**
 * Update user information
 * @param {Number} id
 * @param {String} fullName
 * @param {String} email
 * @returns {Object}
 */
export const editUser = ({ id, fullName, email }) => {
  return async (dispatch) => {
    try {
      dispatch(request("EDIT_USER_REQUEST"));

      const result = await get(userRef).then((snapshot) => {
        const data = snapshot.val() || {};
        var array = Object.keys(data).map((k) => {
          data[k].key = k;
          return data[k];
        });

        var found = array.find((x) => x.id === parseInt(id));

        if (found) {
          data[found.key] = {
            ...data[found.key],
            name: fullName,
            email,
          };
          set(ref(database, "users/" + found.key), data[found.key]);
          return data[found.key];
        }
      });

      dispatch(success("EDIT_USER_SUCCESS", result));
      return result;
    } catch (error) {
      if (error?.response?.data?.message === "User does not exist") {
        logout();
      }
      dispatch(failure("EDIT_USER_FAILURE"));
    }
  };
};

/**
 * Delete user
 * @param {Number} id
 * @returns {Object}
 */
export const deleteUserById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(request("DELETE_USER_REQUEST"));

      const result = await get(userRef).then((snapshot) => {
        const data = snapshot.val() || {};
        var array = Object.keys(data).map((k) => {
          data[k].key = k;
          return data[k];
        });

        var found = array.find((x) => x.id === parseInt(id));

        if (found) {
          const deleted = data[found.key];
          data[found.key] = null;
          set(ref(database, "users/" + found.key), data[found.key]);
          return deleted;
        }
      });

      dispatch(success("DELETE_USER_SUCCESS"));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DELETE_USER_FAILURE"));
    }
  };
};

//#endregion
