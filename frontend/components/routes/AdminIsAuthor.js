import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";

const AdminIsAuthor = ({ children }) => {
    const [ok, setOk] = useState(false);

    const router = useRouter();
    const { testId } = router.query;

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                if (testId !== undefined) {
                    const { data } = await axios.get(
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
    }, [router, ok, testId]);

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
