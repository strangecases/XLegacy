import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import customizeReducer from "./customizeReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import examReducer from "./examReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    tests: testReducer,
    custom: customizeReducer,
    questions: questionReducer,
    answers: answerReducer,
    exam: examReducer,
});

export default rootReducer;
