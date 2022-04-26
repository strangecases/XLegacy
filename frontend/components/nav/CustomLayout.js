import { Layout } from "antd";
import HeaderTop from "./HeaderTop";
import SideBar from "./SideBar";

const { Content, Footer } = Layout;

const CustomLayout = ({ children }) => {
    return (
        <Layout hasSider>
            <SideBar />
            <Layout className="site-layout">
                <HeaderTop />
                <Content
                    style={{
                        margin: "10px 16px 0",
                        overflow: "initial",
                    }}
                >
                    {children}
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
