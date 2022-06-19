import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { message } from "antd";
import Spinner from "../Spinner";

const AdminIsSchoolAdmin = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                if (id !== undefined) {
                    const { data } = await axios.get(
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
        fetchAdmin();
    }, [router, ok, id]);

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminIsSchoolAdmin;
