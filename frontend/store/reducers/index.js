import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import customizeReducer from "./customizeReducer";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    tests: testReducer,
    custom: customizeReducer,
    questions: questionReducer,
});

export default rootReducer;
