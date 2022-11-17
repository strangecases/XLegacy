import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";

const PrincipleRoute = ({ children }) => {
    const [ok, setOk] = useState(true);

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPrinciple = async () => {
            try {
                const { data } = await axiosFetch.get(
                    "/api/principle/current-principle"
                );
                if (data.ok) {
                    setOk(true);
                }
                // console.log("principleRoute");
            } catch (err) {
                // console.log(err);
                toast.error("If u are principle, login to visit this page", {
                    autoClose: 2200,
                    hideProgressBar: true,
                });
                router.push("/principle-login");
                setOk(false);
            }
        };
        fetchPrinciple();
    }, [router, dispatch]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default PrincipleRoute;
