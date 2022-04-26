import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminIsAuthor = ({ children }) => {
    const [ok, setOk] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                if (id !== undefined) {
                    const { data } = await axios.get(
                        `/api/admin-is-author/${id}`
                    );
                    if (data.ok) {
                        setOk(true);
                    }
                }
            } catch (err) {
                console.log(err);
                setOk(false);
                router.push("/admin");
            }
        };
        fetchAdmin();
    }, [router, ok, id]);

    return (
        <div>
            {ok ? (
                <> {children} </>
            ) : (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-primary p-5"
                />
            )}
        </div>
    );
};

export default AdminIsAuthor;
