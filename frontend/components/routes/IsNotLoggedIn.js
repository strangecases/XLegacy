import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";
import { LOGOUT } from "../../store/types";

const IsNotLoggedIn = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();

    const { admin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axiosFetch.get("/api/current-admin");
                if (data.ok) {
                    setOk(false);
                    router.push("/admin");
                }
            } catch (err) {
                console.log(err.response);
                setOk(true);
                dispatch({ type: LOGOUT });
            }
        };
        fetchAdmin();
    }, [router, ok, dispatch, admin]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default IsNotLoggedIn;
