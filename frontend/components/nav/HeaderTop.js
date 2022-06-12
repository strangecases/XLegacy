import { Layout, Menu } from "antd";
import { CoffeeOutlined, LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import allActions from "../../store/actions";

const { Header } = Layout;
const { Item, ItemGroup, SubMenu } = Menu;

const HeaderTop = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { admin } = useSelector((state) => state.auth);

    const logout = async () => {
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        dispatch(allActions.adminActions.logOut());
        router.push("/login");
    };

    return (
        <Header
            style={{
                position: "sticky",
                zIndex: 1000,
                width: "100%",
                top: 0,
                padding: 0,
                height: 46,
                lineHeight: "46px",
                background: "#fff",
            }}
        >
            <Menu
                theme="light"
                mode="horizontal"
                // style={{
                //     position: "sticky",
                //     zIndex: 1,
                //     width: "100%",
                //     padding: 0,
                //     height: 46,
                //     lineHeight: "46px",
                //     background: "#fff",
                // }}
            >
                <SubMenu
                    icon={<CoffeeOutlined />}
                    title={admin && admin.name}
                    style={{ marginLeft: "auto", position: "relative" }}
                >
                    <ItemGroup>
                        <Item key="/admin">
                            <Link href="/admin">
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
            </Menu>
        </Header>
    );
};

export default HeaderTop;
