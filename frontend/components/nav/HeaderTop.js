import { Layout, Menu } from "antd";
import { CoffeeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import allActions from "../../store/actions";
import antNavStyle from "../../styles/modules/componentStyles/AntNav.module.css";

const { Header } = Layout;
const { Item, ItemGroup, SubMenu } = Menu;

const HeaderTop = () => {
    const dispatch = useDispatch();

    const { admin } = useSelector((state) => state.auth);

    const logout = async () => {
        dispatch(allActions.adminActions.logOut());
    };

    return (
        <Header className={antNavStyle["header-nav"]}>
            <Menu theme="light" mode="horizontal">
                <SubMenu
                    icon={<CoffeeOutlined />}
                    title={admin && admin.name}
                    className={antNavStyle["header-nav-submenu"]}
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
