import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import allActions from "../../store/actions";

const AdminRoute = ({ children }) => {
    const [ok, setOk] = useState(true);

    const router = useRouter();

    const { admin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axios.get("/api/current-admin");
                if (data.ok) {
                    setOk(true);
                }
            } catch (err) {
                console.log(err);
                dispatch(allActions.adminActions.logOut());
                setOk(false);
                router.push("/login");
            }
        };
        fetchAdmin();
    }, [router, ok, dispatch, admin]);

    return (
        <div>
            {ok ? (
                <> {children} </>
            ) : (
                <Spin
                    size="large"
                    style={{ position: "relative", top: "21vh", left: "45%" }}
                    indicator={<SyncOutlined spin style={{ fontSize: 72 }} />}
                />
            )}
        </div>
    );
};

export default AdminRoute;
