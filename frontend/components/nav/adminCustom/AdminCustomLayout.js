import { Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import HeaderTop from "../HeaderTop";
import customLayoutStyle from "../../../styles/modules/componentStyles/CustomLayout.module.css";
import AdminSideBarMenu from "./AdminSideBarMenu";
import SideBar from "../SideBar";
import SideBarDrawer from "../SideBarDrawer";

const { Content, Footer } = Layout;

const AdminCustomLayout = ({ children, type }) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <Layout hasSider>
            {!isTabletOrMobile ? (
                <SideBar>
                    <AdminSideBarMenu type={type} />
                </SideBar>
            ) : (
                <SideBarDrawer>
                    <AdminSideBarMenu type={type} drawer />
                </SideBarDrawer>
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

export default AdminCustomLayout;
