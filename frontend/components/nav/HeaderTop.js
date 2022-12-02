import { Button, Layout, Menu, Avatar } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
// import { useEffect, useState } from "react";
import allActions from "../../store/actions";
import HeaderTopNavStyle from "../../styles/modules/componentStyles/HeaderTopNav.module.css";
import { stringOverflow } from "../../utils";

const { Header } = Layout;
// const { Item, ItemGroup, SubMenu } = Menu;

const HeaderTop = ({ isTabletOrMobile = true }) => {
    // const [adminNameHydrate, setAdminNameHydrate] = useState("");

    const dispatch = useDispatch();

    const { role, auth, custom } = useSelector((state) => state);
    const { admin } = auth;
    const { siderCollapse } = custom;

    // useEffect(() => {
    //     setAdminNameHydrate(admin.name);
    // }, [admin]);

    const logout = async () => {
        if (role === "Admin") {
            dispatch(allActions.adminActions.logOut());
        } else if (role === "Principle") {
            dispatch(allActions.principleActions.principleLogout());
        }
    };

    const onCollapse = (isCollapse) => {
        dispatch(allActions.customActions.siderCollapse(isCollapse));
    };

    const itemsSm = [
        {
            label: (
                <Link href="/admin">
                    <a>Dashboard</a>
                </Link>
            ),
            key: "/admin",
        },
        {
            label: "Logout",
            key: "/logout",
            icon: <LogoutOutlined />,
            onClick: logout,
        },
    ];

    const items = [
        // isTabletOrMobile && {
        //     label: (
        //         <Button className={HeaderTopNavStyle["header-bread"]}>
        //             <MenuOutlined />
        //         </Button>
        //     ),
        //     onClick: () => onCollapse(!siderCollapse),
        // },
        {
            label: admin ? stringOverflow(admin.name, 12) : "",
            // label: stringOverflow(adminNameHydrate, 12),
            icon: (
                <Avatar
                    className={HeaderTopNavStyle["header-nav-avatar"]}
                    size="small"
                >
                    {admin ? admin.name[0]?.toUpperCase() : "U"}
                    {/* {adminNameHydrate[0]?.toUpperCase()} */}
                </Avatar>
            ),
            className: HeaderTopNavStyle["header-nav-submenu"],
            children: itemsSm,
        },
    ];

    return (
        <Header className={HeaderTopNavStyle["header-nav"]}>
            {isTabletOrMobile && (
                <div className={HeaderTopNavStyle["header-bread-div"]}>
                    <Button
                        onClick={() => onCollapse(!siderCollapse)}
                        className={HeaderTopNavStyle["header-bread"]}
                        shape="circle"
                    >
                        <MenuOutlined
                            className={
                                HeaderTopNavStyle["header-menu-outlined"]
                            }
                        />
                    </Button>
                </div>
            )}

            <Menu
                theme="light"
                mode="horizontal"
                items={items}
                overflowedIndicator={
                    <Avatar
                        size="small"
                        className={HeaderTopNavStyle["header-nav-avatar"]}
                    >
                        {admin ? admin.name[0]?.toUpperCase() : "U"}
                        {/* {adminNameHydrate[0]?.toUpperCase()} */}
                    </Avatar>
                }
                className={HeaderTopNavStyle["header-top-nav-menu"]}
            />

            <Menu
                theme="light"
                mode="horizontal"
                items={itemsSm}
                overflowedIndicator={
                    <Avatar
                        className={HeaderTopNavStyle["header-nav-avatar-sm"]}
                    >
                        {admin ? admin.name[0]?.toUpperCase() : "U"}
                        {/* {adminNameHydrate[0]?.toUpperCase()} */}
                    </Avatar>
                }
                className={HeaderTopNavStyle["header-top-nav-menu-sm"]}
            />
        </Header>
    );
};

// export default HeaderTop;
export default dynamic(() => Promise.resolve(HeaderTop), { ssr: false });
