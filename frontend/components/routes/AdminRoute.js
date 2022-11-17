import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";
import allActions from "../../store/actions";

const AdminRoute = ({ children }) => {
    const [ok, setOk] = useState(true);

    const router = useRouter();

    const { admin } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const persist = JSON.parse(
            localStorage.getItem("persist:persistStore")
        )?.auth;

        let persistAdmin;
        if (persist) persistAdmin = JSON.parse(persist);

        if (!admin && !persistAdmin.admin)
            dispatch(allActions.adminActions.logOut());
    }, [admin, dispatch]);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axiosFetch.get("/api/current-admin");
                if (data.ok) {
                    setOk(true);
                }
                // console.log("adminRoute");
            } catch (err) {
                // console.log(err);
                toast.error("Please login to visit this page", {
                    autoClose: 2200,
                    hideProgressBar: true,
                });
                router.push("/login");
                setOk(false);
            }
        };
        fetchAdmin();
    }, [router, dispatch]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminRoute;
