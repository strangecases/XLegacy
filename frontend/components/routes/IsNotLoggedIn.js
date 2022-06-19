import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import allActions from "../../store/actions";

const IsNotLoggedIn = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();

    const { admin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axios.get("/api/current-admin");
                if (data.ok) {
                    setOk(false);
                    router.push("/admin");
                }
            } catch (err) {
                console.log(err.response);
                setOk(true);
                dispatch(allActions.adminActions.logOut());
            }
        };
        fetchAdmin();
    }, [router, ok, dispatch, admin]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default IsNotLoggedIn;
