import { Layout } from "antd";
import HeaderTop from "./HeaderTop";
import SideBar from "./SideBar";
import antNavStyle from "../../styles/modules/componentStyles/AntNav.module.css";

const { Content, Footer } = Layout;

const CustomLayout = ({ children, type = "outside" }) => {
    return (
        <Layout hasSider>
            <SideBar type={type} />
            <Layout className="site-layout">
                <HeaderTop />
                <Content className={antNavStyle["custom-layout-content"]}>
                    {children}
                </Content>
                <Footer className={antNavStyle["custom-layout-footer"]}>
                    ScholarX ©2022
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
