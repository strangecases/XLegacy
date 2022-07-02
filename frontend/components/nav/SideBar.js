import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
    UserOutlined,
    FormOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import antNavStyle from "../../styles/modules/componentStyles/AntNav.module.css";

const { Sider } = Layout;

const SideBar = ({ type }) => {
    const [collapsed, setCollapsed] = useState(true);
    // const [showMobileSideBar, setShowMobileSideBar] = useState(false);
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

    const { schools } = useSelector((state) => state);

    const router = useRouter();
    const { id } = router.query;

    // useEffect(() => {
    //     if (window.innerWidth > 767) setShowMobileSideBar(true);
    //     else if (window.innerWidth < 767) setShowMobileSideBar(false);
    // }, []);

    useEffect(() => {
        if (!isTabletOrMobile) {
            setCollapsed(false);
        }
    }, [isTabletOrMobile]);

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth > 767) {
    //             setShowMobileSideBar(true);
    //             setCollapsed(false);
    //         } else if (window.innerWidth < 767) {
    //             setCollapsed(true);
    //             setShowMobileSideBar(false);
    //         }
    //     };

    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    const onCollapse = (isCollapsed) => {
        setCollapsed(isCollapsed);
    };

    console.log("iscollapse", isTabletOrMobile);

    return (
        <Sider
            // theme="light"
            collapsible={!isTabletOrMobile}
            collapsed={!isTabletOrMobile ? collapsed : isTabletOrMobile}
            onCollapse={onCollapse}
            className={antNavStyle["sidebar-sider"]}
            width={200}
        >
            {/* <img
                alt="hi"
                className="logo"
                src="https://www.skysens.io/images/white-logo.png"
                width={50}
                height={50}
            /> */}
            {!isTabletOrMobile ? (
                <div className={antNavStyle["header-div"]}>
                    {!collapsed ? "Scholar X" : "SX"}
                </div>
            ) : (
                <div className={antNavStyle["header-div"]}>SX</div>
            )}
            {type === "inside" && schools[id] ? (
                <Menu
                    theme="dark"
                    mode="inline"
                    // onClick={(e) => setCurrent(e.key)}
                    selectedKeys={
                        router.asPath.includes("tests")
                            ? `/schools/${id}/tests`
                            : router.asPath
                    }
                    defaultSelectedKeys={[`/schools/${id}/edit`]}
                    className={antNavStyle["sidebar-menu"]}
                >
                    <Menu.Item
                        key={`/schools/${id}/tests`}
                        icon={<UserOutlined />}
                    >
                        <Link href={`/schools/${id}/tests`}>
                            <a>{schools[id].schoolName}</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key={`/schools/${id}/edit`}
                        icon={<SolutionOutlined />}
                    >
                        <Link href={`/schools/${id}/edit`}>
                            <a>Edit Details</a>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/schools" icon={<SolutionOutlined />}>
                        <Link href="/schools">
                            <a>All Schools</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            ) : (
                <Menu
                    theme="dark"
                    mode="inline"
                    // onClick={(e) => setCurrent(e.key)}
                    selectedKeys={router.asPath}
                    // defaultSelectedKeys={["1"]}
                    className={antNavStyle["sidebar-menu"]}
                >
                    <Menu.Item key="/admin" icon={<UserOutlined />}>
                        <Link href="/admin">
                            <a>Dashboard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/schools/new" icon={<FormOutlined />}>
                        <Link href="/schools/new">
                            <a>Add School</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/schools" icon={<SolutionOutlined />}>
                        <Link href="/schools">
                            <a>Schools</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            )}
        </Sider>
    );
};

export default SideBar;
