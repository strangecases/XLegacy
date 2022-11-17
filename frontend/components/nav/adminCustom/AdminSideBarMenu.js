import { Menu } from "antd";
import {
    UserOutlined,
    FormOutlined,
    SolutionOutlined,
    ClusterOutlined,
    RocketOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import customLayoutStyle from "../../../styles/modules/componentStyles/CustomLayout.module.css";
import allActions from "../../../store/actions";

const AdminSideBarMenu = ({ type = "outside", drawer = false }) => {
    const { schools } = useSelector((state) => state);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    const outsideitems = [
        {
            key: `/admin`,
            label: (
                <Link href="/admin">
                    <a>Dashboard</a>
                </Link>
            ),

            icon: <UserOutlined />,
        },
        {
            key: `/schools/new`,
            label: (
                <Link href="/schools/new">
                    <a>Add School</a>
                </Link>
            ),

            icon: <FormOutlined />,
        },
        {
            key: `/schools`,
            label: (
                <Link href="/schools">
                    <a>Schools</a>
                </Link>
            ),

            icon: <ClusterOutlined />,
        },
    ];

    const insideitems = [
        {
            key: `/schools/${id}/tests`,
            label: (
                <Link href={`/schools/${id}/tests`}>
                    <a>{schools[id]?.schoolName}</a>
                </Link>
            ),

            icon: <RocketOutlined />,
        },
        {
            key: `/schools/${id}/edit`,
            label: (
                <Link href={`/schools/${id}/edit`}>
                    <a>Edit Details</a>
                </Link>
            ),

            icon: <SolutionOutlined />,
        },
        {
            key: `/schools`,
            label: (
                <Link href="/schools">
                    <a>All Schools</a>
                </Link>
            ),

            icon: <ClusterOutlined />,
        },
    ];

    const onMenuItemClick = () => {
        dispatch(allActions.customActions.siderCollapse(false));
    };

    return type === "inside" && schools[id] ? (
        <Menu
            theme="dark"
            mode="inline"
            onClick={drawer ? onMenuItemClick : () => {}}
            selectedKeys={
                router.asPath.includes("tests")
                    ? `/schools/${id}/tests`
                    : router.asPath
            }
            className={customLayoutStyle["sidebar-menu"]}
            items={insideitems}
        />
    ) : (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={router.asPath}
            className={customLayoutStyle["sidebar-menu"]}
            onClick={drawer ? onMenuItemClick : () => {}}
            items={outsideitems}
        />
    );
};

export default AdminSideBarMenu;
