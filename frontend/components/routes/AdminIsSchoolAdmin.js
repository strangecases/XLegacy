import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
import Spinner from "../Spinner";
import axiosFetch from "../../axiosFetch";

const AdminIsSchoolAdmin = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                if (id !== undefined) {
                    const { data } = await axiosFetch.get(
                        `/api/admin-is-school-admin/${id}`
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
        if (id) fetchAdmin();
    }, [router, id]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminIsSchoolAdmin;
