import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { wrapper, store, persistor } from "../store/store";
import TopNav from "../components/nav/TopNav";

function MyApp({ Component, pageProps }) {
    const getLayout =
        Component.getLayout || ((page) => <TopNav>{page}</TopNav>);
    return getLayout(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ToastContainer
                    theme="dark"
                    position="bottom-left"
                    newestOnTop
                />
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
