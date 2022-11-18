import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "antd";

import { useMediaQuery } from "react-responsive";

import customLayoutStyle from "../../styles/modules/componentStyles/CustomLayout.module.css";

const { Sider } = Layout;

const SideBar = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const isBetweenTabletOrBigScreen = useMediaQuery({ maxWidth: 992 });

    useEffect(() => {
        if (isBetweenTabletOrBigScreen) {
            setCollapsed(true);
        } else if (!isBetweenTabletOrBigScreen) {
            setCollapsed(false);
        }
    }, [isBetweenTabletOrBigScreen]);

    const onCollapse = (isCollapsed) => {
        setCollapsed(isCollapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            collapsedWidth={80}
            className={customLayoutStyle["sidebar-sider"]}
            width={200}
        >
            {/* {!isBetweenTabletOrBigScreen ? ( */}
            <div className={customLayoutStyle["header-div"]}>
                {!collapsed ? "Scholar X" : "SX"}
            </div>
            {/* ) : (
                <div className={customLayoutStyle["header-div"]}>SX</div>
            )} */}

            {children}
        </Sider>
    );
};

// export default SideBar;
export default dynamic(() => Promise.resolve(SideBar), { ssr: false });
