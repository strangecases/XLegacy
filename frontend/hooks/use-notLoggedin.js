import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axiosFetch from "../axiosFetch";
import { LOGOUT } from "../store/types";

const useNotLoggedIn = ({ link, routeLink }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axiosFetch.get(link);
                if (data.ok) {
                    setOk(false);
                    router.push(routeLink);
                }
            } catch (err) {
                setOk(true);
                dispatch({ type: LOGOUT });
            }
        };
        if (link) fetchAdmin();
    }, [dispatch, router, link, routeLink]);

    return { ok };
};

export default useNotLoggedIn;
