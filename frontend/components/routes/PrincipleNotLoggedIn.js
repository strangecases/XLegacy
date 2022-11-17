import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";
import { LOGOUT } from "../../store/types";

const PrincipleNotLoggedIn = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPrinciple = async () => {
            try {
                const { data } = await axiosFetch.get(
                    "/api/principle/current-principle"
                );
                if (data.ok) {
                    setOk(false);
                    router.push("/principle-example");
                }
                // console.log("PrincipleNotLoggedIn");
            } catch (err) {
                // console.log(err.response);
                setOk(true);
                dispatch({ type: LOGOUT });
            }
        };
        fetchPrinciple();
    }, [router, dispatch]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default PrincipleNotLoggedIn;
