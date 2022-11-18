// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./reducers";

const initialState = {};

const persistConfig = {
    key: "persistStore",
    storage,
    whitelist: [
        "auth",
        "custom",
        "questions",
        "answers",
        "exam",
        "schools",
        "role",
    ],
};

// const middleware = [thunk];

// creating store
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    }
    return rootReducer(state, action);
};

const store = configureStore(
    {
        reducer: persistReducer(persistConfig, reducer),
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
    }
    // composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
