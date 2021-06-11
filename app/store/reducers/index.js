import { combineReducers } from "redux";

const Initial_state = {
  isRegistered: false,
  userData: {},
};

const registrationReducer = (state = Initial_state, action) => {
  switch (action.type) {
    case "REGISTER": {
      let newState = Object.assign({}, state, {
        userData: action.payload,
        isRegistered: true,
      });
      return newState;
    }
    case "SET_STATUS": {
      let newState = Object.assign({}, state, { isRegistered: action.payload });
      return newState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  registration: registrationReducer,
});

//export default registrationReducer;
