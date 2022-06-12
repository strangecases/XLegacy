import { Layout } from "antd";
import HeaderTop from "./HeaderTop";
import SideBar from "./SideBar";

const { Content, Footer } = Layout;

const CustomLayout = ({ children, type = "outside" }) => {
    return (
        <Layout hasSider>
            <SideBar type={type} />
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
                <Footer style={{ textAlign: "center" }}>ScholarX ©2022</Footer>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
