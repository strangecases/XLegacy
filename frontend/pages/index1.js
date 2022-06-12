import React, { useState } from "react";
import { Modal, Button, Card, Row, Col, Menu } from "antd";
import Link from "next/link";
import homeStyles from "../styles/modules/Home.module.css";

const App = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setVisible(false);
    };

    return (
        <>
            <div>
                <div
                    className="site-layout-background"
                    style={{ color: "black" }}
                >
                    <div
                        style={{
                            minHeight: 650,
                            overflow: "hidden",
                        }}
                        className={homeStyles.backgroundHomeColor}
                    >
                        <Menu
                            style={{
                                background: "transparent",
                                position: "sticky",
                                zIndex: 1001,
                                top: 0,
                            }}
                        >
                            <Menu.Item>
                                <Link href="/">
                                    <a>SCHOLAR X</a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                        <span
                            style={{
                                width: "35vw",
                                position: "relative",
                                top: "15vh",
                                left: "52vw",
                                fontSize: "1.6rem",
                                overflow: "hidden",
                                display: "flex",
                                flexWrap: "wrap",
                                color: "#de1a06",
                                fontWeight: "bold",
                            }}
                        >
                            ScholarX makes it easy to manage your tests.
                        </span>
                    </div>
                    <div
                    // style={{
                    //     minHeight: 650,

                    //     marginBottom: 10,
                    // }}
                    />

                    <div
                        style={{
                            padding: 30,
                            background: "#ead48e",
                            minHeight: 1500,
                        }}
                    >
                        <Row gutter={[10, 16]}>
                            <Col xs={24} sm={12} md={8} lg={8} span={8}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://images.unsplash.com/photo-1507837357635-0c89d2d066de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                            height={240}
                                        />
                                    }
                                    style={{
                                        borderRadius: 8,
                                        backgroundColor: "#eee6e5",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={8} md={8} span={8}>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: 8,
                                        backgroundColor: "#eee6e5",
                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://images.unsplash.com/photo-1488344967616-95c793fc0b82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                            height={240}
                                        />
                                    }
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8} span={8}>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: 8,
                                        backgroundColor: "#eee6e5",
                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                            height={240}
                                        />
                                    }
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <footer className={homeStyles.footerBackground}>
                <div>Lorem ipsum dolor sit amet</div>
                <div>Lorem ipsum dolor sit amet, consectetur</div>
            </footer>
        </>
    );
};

// App.getLayout = (page) => page;

export default App;
