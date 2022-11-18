import { Layout, Drawer } from "antd";
// import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/actions";
import customLayoutStyle from "../../styles/modules/componentStyles/CustomLayout.module.css";

const { Sider } = Layout;

const SideBarDrawer = ({ children }) => {
    const dispatch = useDispatch();

    const { siderCollapse } = useSelector((state) => state.custom);

    const onMenuItemClick = () => {
        dispatch(allActions.customActions.siderCollapse(false));
    };

    return (
        <Drawer
            headerStyle={{ display: "none" }}
            onClose={onMenuItemClick}
            width={150}
            placement="left"
            open={siderCollapse}
            className={customLayoutStyle["sidebar-drawer"]}
        >
            <Sider
                trigger={null}
                className={customLayoutStyle["sidebar-sider-drawer"]}
                width={150}
            >
                <div className={customLayoutStyle["header-div-drawer"]}>
                    Scholar X
                </div>

                {children}
            </Sider>
        </Drawer>
    );
};

export default SideBarDrawer;
// export default dynamic(() => Promise.resolve(SideBarDrawer), { ssr: false });
