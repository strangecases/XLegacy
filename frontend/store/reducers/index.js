import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import customizeReducer from "./customizeReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import examReducer from "./examReducer";
import schoolReducer from "./schoolReducer";
import modalReducer from "./modalReducer";
import roleReducer from "./roleReducer";
import questionsDeawerReducer from "./questionsDrawerReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    tests: testReducer,
    custom: customizeReducer,
    questions: questionReducer,
    answers: answerReducer,
    exam: examReducer,
    schools: schoolReducer,
    modals: modalReducer,
    role: roleReducer,
    questionsDrawer: questionsDeawerReducer,
    load: loadingReducer,
});

export default rootReducer;
