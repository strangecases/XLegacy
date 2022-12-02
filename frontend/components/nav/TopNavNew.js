import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Avatar } from "antd";
import Link from "next/link";
import {
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import allActions from "../../store/actions";
import antNavNewStyle from "../../styles/modules/componentStyles/AntNavNew.module.css";
import { stringOverflow } from "../../utils";

const TopNavNew = ({ children }) => {
    const [current, setCurrent] = useState("");
    const [mount, setMount] = useState(false);

    const { role, auth } = useSelector((state) => state);
    const { admin } = auth;

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        if (process.browser) setCurrent(router.pathname);
        setMount(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname]);

    const logout = async () => {
        if (role === "Admin") {
            dispatch(allActions.adminActions.logOut());
        } else if (role === "Principle") {
            dispatch(allActions.principleActions.principleLogout());
        }
        // console.log(role);
    };

    // console.log("topnac hiii");

    const itemsSm = [
        {
            label: (
                <Link href="/admin">
                    <a>Dashboard</a>
                </Link>
            ),
            key: "/admin",
        },
        {
            label: "Logout",
            key: "/logout",
            onClick: logout,
            icon: <LogoutOutlined />,
        },
    ];

    const items = [
        admin === null && {
            label: (
                <Link href="/login">
                    <a>Login</a>
                </Link>
            ),
            key: "/login",
            icon: <LoginOutlined />,
            className: antNavNewStyle["font-size-small"],
        },
        admin === null && {
            label: (
                <Link href="/register">
                    <a>Register</a>
                </Link>
            ),
            key: "/register",
            icon: <UserAddOutlined />,
            className: antNavNewStyle["font-size-small"],
        },
        admin !== null && {
            label: admin ? stringOverflow(admin.name, 12) : "",
            key: "#",
            icon: (
                <Avatar
                    className={antNavNewStyle["submenu-nav-avatar"]}
                    size="small"
                >
                    {admin ? admin.name[0]?.toUpperCase() : "u"}
                </Avatar>
            ),
            className: antNavNewStyle["top-nav-submenu"],
            children: itemsSm,
        },
    ];

    return (
        mount && (
            <>
                <header className={antNavNewStyle["nav-new"]}>
                    <div className={antNavNewStyle["nav-new-div"]}>
                        <div
                            className={
                                admin === null
                                    ? antNavNewStyle["header-bold"]
                                    : antNavNewStyle["header-bold-submenu"]
                            }
                        >
                            ScholarX
                        </div>

                        <Menu
                            overflowedIndicator={
                                admin === null ? (
                                    <MenuOutlined
                                        className={
                                            antNavNewStyle["menu-outlined"]
                                        }
                                    />
                                ) : (
                                    <Avatar
                                        className={
                                            antNavNewStyle["submenu-nav-avatar"]
                                        }
                                        size="small"
                                    >
                                        {admin
                                            ? admin.name[0]?.toUpperCase()
                                            : "U"}
                                    </Avatar>
                                )
                            }
                            mode="horizontal"
                            onClick={(e) => setCurrent(e.key)}
                            selectedKeys={[current]}
                            className={
                                admin === null
                                    ? antNavNewStyle["top-nav-menu"]
                                    : antNavNewStyle["top-nav-menu-submenu"]
                            }
                            items={items}
                        />

                        <Menu
                            overflowedIndicator={
                                <Avatar
                                    className={
                                        antNavNewStyle["submenu-nav-avatar-sm"]
                                    }
                                >
                                    {admin ? admin.name[0]?.toUpperCase() : "U"}
                                </Avatar>
                            }
                            mode="horizontal"
                            onClick={(e) => setCurrent(e.key)}
                            selectedKeys={[current]}
                            className={
                                antNavNewStyle["top-nav-menu-submenu-sm"]
                            }
                            items={itemsSm}
                        />
                    </div>
                </header>

                {children}
            </>
        )
    );
};

export default TopNavNew;
