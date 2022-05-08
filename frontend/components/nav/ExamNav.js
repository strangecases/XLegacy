import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import allActions from "../../store/actions";

const { Item, SubMenu } = Menu;

const ExamNav = ({ children }) => {
    // const [current, setCurrent] = useState("/");
    // const [mount, setMount] = useState(false);

    const { admin } = useSelector((state) => state.auth);
    const { examData } = useSelector((state) => state.exam);

    const dispatch = useDispatch();

    const router = useRouter();

    // useEffect(() => {
    //     if (process.browser) setCurrent(router.pathname);
    //     setMount(true);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [router.pathname]);

    return (
        // mount && (
        <>
            <Menu
                mode="horizontal"
                // onClick={(e) => setCurrent(e.key)}
                selectedKeys="/"
                style={{
                    height: 46,
                    border: 0,
                }}
            >
                <Item key="/" icon={<AppstoreOutlined />}>
                    App
                </Item>
                <Item key="#" className="margin-left-auto">
                    {examData && examData.studentName}
                </Item>
            </Menu>

            {children}
        </>
    );
    // );
};

export default ExamNav;
