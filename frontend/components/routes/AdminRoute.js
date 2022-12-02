import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import allActions from "../../store/actions";
import useAuthorization from "../../hooks/use-authorization";

const AdminRoute = ({ children }) => {
    const { admin } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { ok } = useAuthorization({
        link: "/api/current-admin",
        routeLink: "/login",
        messageShow: "Please login to visit this page",
    });

    useEffect(() => {
        const persist = JSON.parse(
            localStorage.getItem("persist:persistStore")
        )?.auth;

        let persistAdmin;
        if (persist) persistAdmin = JSON.parse(persist);

        if (!admin && !persistAdmin.admin)
            dispatch(allActions.adminActions.logOut());
    }, [admin, dispatch]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminRoute;
