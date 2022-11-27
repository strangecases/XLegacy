import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { ConfigProvider } from "antd"; // new

import { wrapper, persistor } from "../store/store";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "antd/dist/reset.css"; // new
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import TopNavNew from "../components/nav/TopNavNew";

require("../styles/variables.less");

function MyApp({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    const getLayout =
        Component.getLayout || ((page) => <TopNavNew>{page}</TopNavNew>);

    return (
        <Provider store={store}>
            {getLayout(
                <PersistGate persistor={persistor}>
                    <ToastContainer
                        theme="dark"
                        position="bottom-left"
                        newestOnTop
                    />
                    {/* <ConfigProvider
                        theme={{ token: { colorPrimary: "#fca225" } }}
                    > */}
                    {/* new */}
                    <Component {...pageProps} />
                    {/* </ConfigProvider> */}
                    {/* new */}
                </PersistGate>
            )}
        </Provider>
    );
}

export default MyApp;
