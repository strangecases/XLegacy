import axios from "axios";

const baseURL =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? `${process.env.NEXT_BACK_URL}`
        : "";

const axiosFetch = axios.create({
    baseURL,
});

export default axiosFetch;
