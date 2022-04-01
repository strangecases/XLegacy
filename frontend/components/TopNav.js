import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    CoffeeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import allActions from "../store/actions";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        if (process.browser) setCurrent(window.location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process.browser && window.location.pathname]);

    const logout = async () => {
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        dispatch(allActions.userActions.logOut());
        router.push("/login");
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item
                key="/"
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/">
                    <a>App</a>
                </Link>
            </Item>
            {user === null && (
                <>
                    <Item
                        key="/login"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<LoginOutlined />}
                    >
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Item>
                    <Item
                        key="/register"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<UserAddOutlined />}
                    >
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            )}
            {user !== null && (
                <SubMenu
                    icon={<CoffeeOutlined />}
                    title={user && user.name}
                    style={{ marginLeft: "auto" }}
                >
                    <ItemGroup>
                        <Item key="/user">
                            <Link href="/user">
                                <a>Dashboard</a>
                            </Link>
                        </Item>
                        <Item
                            key="/logout"
                            onClick={logout}
                            icon={<LogoutOutlined />}
                        >
                            Logout
                        </Item>
                    </ItemGroup>
                </SubMenu>
            )}
        </Menu>
    );
};

export default TopNav;
