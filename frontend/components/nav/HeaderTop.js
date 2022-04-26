import { Layout, Menu } from "antd";
import { CoffeeOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;
const { Item, ItemGroup, SubMenu } = Menu;

const HeaderTop = () => {
    return (
        <Header
            style={{
                position: "sticky",
                zIndex: 1,
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
                    title="sumanth08"
                    style={{ marginLeft: "auto", position: "relative" }}
                >
                    <ItemGroup>
                        <Item key="/admin">
                            <Link href="/admin">
                                <a>Dashboard</a>
                            </Link>
                        </Item>
                        <Item key="/logout" icon={<LogoutOutlined />}>
                            Logout
                        </Item>
                    </ItemGroup>
                </SubMenu>
            </Menu>
        </Header>
    );
};

export default HeaderTop;
