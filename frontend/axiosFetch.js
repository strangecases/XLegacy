import axios from "axios";

const baseURL =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_BACK_URL}`
        : "";

const axiosFetch = axios.create({
    baseURL,
    withCredentials: true,
});

export default axiosFetch;
