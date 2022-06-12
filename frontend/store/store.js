import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./reducers";

const initialState = {};

const persistConfig = {
    key: "persistStore",
    storage,
    whitelist: ["auth", "custom", "questions", "answers", "exam", "schools"],
};

const middleware = [thunk];

// creating store
export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
