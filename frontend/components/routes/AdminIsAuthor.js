import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";

const AdminIsAuthor = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();
    const { testId } = router.query;

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                if (testId !== undefined) {
                    const { data } = await axiosFetch.get(
                        `/api/admin-is-author/${testId}`
                    );
                    if (data.ok) {
                        setOk(true);
                    }
                }
            } catch (err) {
                console.log(err);
                setOk(false);
                message.error("you can not visit that page.", 2);
                router.push("/admin");
            }
        };
        fetchAdmin();
    }, [router, testId]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminIsAuthor;
