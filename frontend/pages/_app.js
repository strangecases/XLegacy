import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import TopNav from "../components/TopNav";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { wrapper, store, persistor } from "../store/store";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ToastContainer position="top-center" />
                <TopNav />
                <Component {...pageProps} />;
            </PersistGate>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
