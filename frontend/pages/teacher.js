import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar } from "antd";

const Teacher = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("404");
    }, [router]);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar icon={<UserOutlined />} size="small" />
        </div>
    );
};

export default Teacher;
