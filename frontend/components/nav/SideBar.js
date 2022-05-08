import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
    AreaChartOutlined,
    UserOutlined,
    FormOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    // const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [showMobileSideBar, setShowMobileSideBar] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 767) setShowMobileSideBar(true);
        else if (window.innerWidth < 767) setShowMobileSideBar(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setShowMobileSideBar(true);
                setCollapsed(false);
            } else if (window.innerWidth < 767) {
                setCollapsed(true);
                setShowMobileSideBar(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const onCollapse = (isCollapsed) => {
        setCollapsed(isCollapsed);
    };

    return (
        <Sider
            // theme="light"
            collapsible={showMobileSideBar}
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <img
                alt="hi"
                className="logo"
                src="https://www.skysens.io/images/white-logo.png"
                width={50}
                height={50}
            />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                style={{ padding: "20px 0" }}
            >
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link href="/admin">
                        <a>Dashboard</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SolutionOutlined />}>
                    <Link href="/schools">
                        <a>Schools</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FormOutlined />}>
                    <Link href="/tests">
                        <a>Tests</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<AreaChartOutlined />}>
                    <Link href="/results">
                        <a>Results</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SideBar;
