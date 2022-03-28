import { ToastContainer } from "react-toastify";
import TopNav from "../components/TopNav";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <ToastContainer position="top-center" />
            <TopNav />
            <Component {...pageProps} />;
        </Provider>
    );
}

export default MyApp;
