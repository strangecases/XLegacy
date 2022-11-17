import { Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import HeaderTop from "./HeaderTop";
import SideBar from "./SideBar";
import SiderDrawer from "./SideBarDrawer";
import customLayoutStyle from "../../styles/modules/componentStyles/CustomLayout.module.css";

const { Content, Footer } = Layout;

const CustomLayout = ({ children, type = "outside" }) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <Layout hasSider>
            {!isTabletOrMobile ? (
                <SideBar type={type} />
            ) : (
                <SiderDrawer type={type} />
            )}
            <Layout className="site-layout" style={{ minHeight: "100vh" }}>
                <HeaderTop isTabletOrMobile={isTabletOrMobile} />
                <Content className={customLayoutStyle["custom-layout-content"]}>
                    {children}
                </Content>
                <Footer className={customLayoutStyle["custom-layout-footer"]}>
                    ScholarX ©2022
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
