import { createStore } from "redux";
import AllReducers from "./reducers/";

const store = createStore(AllReducers);

export { store };
