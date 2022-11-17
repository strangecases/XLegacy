import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";
import { LOGOUT } from "../../store/types";

const IsNotLoggedIn = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axiosFetch.get("/api/current-admin");
                if (data.ok) {
                    setOk(false);
                    router.push("/admin");
                }
                // console.log("IsNotLoggedIn");
            } catch (err) {
                // console.log(err.response);
                setOk(true);
                dispatch({ type: LOGOUT });
            }
        };
        fetchAdmin();
    }, [router, dispatch]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default IsNotLoggedIn;
