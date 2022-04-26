import { Layout, Col, Row, Card, Button, Badge } from "antd";
import { useRouter } from "next/router";
import Questions from "../../../components/Questions/Questions";

import AdminRoute from "../../../components/routes/AdminRoute";

const Section = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <AdminRoute>
            {/* <div
                style={{
                    margin: "10px 0",
                }}
                className="background-section"
            >
                <div
                    style={{
                        margin: "0 16px 0",
                        overflow: "auto",
                        background: "#fff",
                    }}
                >
                    hi
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>
                        ..........................................................................................................................................................
                    </div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                    <div>....</div>
                </div>
            </div> */}
            {/* <Layout style={{ height: "92vh" }}>
                <Row
                    style={{
                        margin: "10px 16px",
                        overflow: "auto",
                    }}
                    gutter={16}
                >
                    <Col className="gutter-row" span={9} style={{}}>
                        <Card
                            bordered={false}
                            style={{
                                margin: "1vh 0.5vh",
                                overflow: "scroll",
                                height: "52vh",
                            }}
                        >
                            <Row
                                gutter={[16, 16]}
                                style={{
                                    padding: "2.5vh",
                                    background: "#f0efed",
                                    borderRadius: "6px",
                                }}
                            >
                                <Col span={4} onClick={() => onSubmit(1)}>
                                    <Button type="">01</Button>
                                </Col>
                                <Col span={4}>
                                    <Badge dot status="success">
                                        <Button type="primary">02</Button>
                                    </Badge>
                                </Col>
                                <Col span={4}>
                                    <Button type="">03</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">04</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">05</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">06</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">07</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">08</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">09</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">10</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">11</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">12</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">13</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">14</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">15</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">16</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">17</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">18</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">19</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">20</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">21</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">22</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">23</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">24</Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="">25</Button>
                                </Col>
                            </Row>
                        </Card>
                        <Card
                            bordered={false}
                            style={{
                                margin: "1vh 0.5vh",
                                overflow: "none",
                            }}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={15}>
                        <Card
                            bordered={false}
                            style={{
                                margin: "1vh 0.5vh",
                                overflow: "none",
                            }}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        <Card
                            bordered={false}
                            style={{
                                margin: "1vh 0.5vh",
                                overflow: "none",
                            }}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </Layout> */}
            <Questions />
        </AdminRoute>
    );
};

// Section.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default Section;
