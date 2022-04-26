import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";

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
                    nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<BarChartOutlined />}>
                    nav 4
                </Menu.Item>
                <Menu.Item key="5" icon={<CloudOutlined />}>
                    nav 5
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                    nav 6
                </Menu.Item>
                <Menu.Item key="7" icon={<TeamOutlined />}>
                    nav 7
                </Menu.Item>
                <Menu.Item key="8" icon={<ShopOutlined />}>
                    nav 8
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SideBar;
