import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { CloseCircleFilled, RightCircleFilled } from "@ant-design/icons";
import Link from "next/link";
import { Button, Row, Col, Card, Collapse, Space, Tooltip } from "antd";
import CustomLayout from "../../../components/nav/CustomLayout";
import allActions from "../../../store/actions";
import CreateSectionForm from "../../../components/modal/modalSection/CreateSectionForm";
import AdminRoute from "../../../components/routes/AdminRoute";
import AdminIsAuthor from "../../../components/routes/AdminIsAuthor";
import { FETCH_TEST } from "../../../store/types";
import EditTestForm from "../../../components/modal/modalTest/EditTestForm";
import DeleteTestForm from "../../../components/modal/modalTest/DeleteTestForm";
import DeleteSectionForm from "../../../components/modal/modalSection/DeleteSectionForm";

const { Panel } = Collapse;

const TestId = () => {
    const router = useRouter();
    const { id } = router.query;

    const { tests } = useSelector((state) => state);
    const dispatch = useDispatch();
    let test;
    let testId;
    if (id !== undefined) {
        test = tests[id];
        testId = id;
    }

    useEffect(() => {
        if (id !== undefined) {
            // const res = await axios.get(`/api/prepare/tests/${id}`);
            dispatch(allActions.testActions.fetchTest(id));
        }
    }, [id, dispatch]);

    const dispatchSelectedSection = (sectionId) => {
        dispatch(allActions.customActions.selectedSectionId(sectionId));
    };

    const showPopConfirm = () => {
        dispatch(allActions.customActions.visibleDeleteSectionYes());
    };

    const renderButton = () => {
        return (
            <Row>
                <Col span={16}>
                    <EditTestForm />
                </Col>
                <Col span={8}>
                    <DeleteTestForm />
                </Col>
            </Row>
        );
    };

    const renderSection = () => {
        return test.sectionData.map((section) => {
            return (
                <Collapse key={section.sectionId}>
                    <Panel header={section.subject} key={section.sectionId}>
                        <Row>
                            <Col span={20}>
                                <p>{section.sectionDescription}</p>
                            </Col>
                            <Col span={4}>
                                <Row
                                    style={{
                                        textAlign: "right",
                                    }}
                                >
                                    <Col span={18}>
                                        <Link
                                            href={`/tests/${testId}/sections`}
                                            passHref
                                            style={{
                                                height: 0,
                                                lineHeight: 0,
                                                verticalAlign: 0,
                                            }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    dispatchSelectedSection(
                                                        section.sectionId
                                                    )
                                                }
                                                style={{ border: "none" }}
                                                shape="circle"
                                                // onClick={showTestModal}
                                                icon={
                                                    <RightCircleFilled
                                                        style={{
                                                            fontSize: 20,
                                                            color: "#0755f0",
                                                            top: 0,
                                                        }}
                                                    />
                                                }
                                                size="small"
                                            />
                                        </Link>
                                    </Col>
                                    <Col span={6}>
                                        <Tooltip
                                            title="Delete Section"
                                            placement="topLeft"
                                            color="red"
                                        >
                                            <Button
                                                style={{ borderStyle: "none" }}
                                                shape="circle"
                                                onClick={showPopConfirm}
                                                icon={
                                                    <CloseCircleFilled
                                                        style={{
                                                            fontSize: 20,
                                                            color: "#939090",
                                                            paddingTop: 5,
                                                        }}
                                                        className="hover-icon-delete"
                                                    />
                                                }
                                                size="small"
                                            />
                                        </Tooltip>
                                        <DeleteSectionForm section={section} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            );
        });
    };

    const renderTest = () => {
        return (
            <Card
                title={test.testTitle}
                key={test._id}
                extra={renderButton()}
                style={{ marginBottom: 20 }}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex" }}
                >
                    {renderSection()}
                </Space>
            </Card>
        );
    };

    return test === undefined ? (
        <div>{}</div>
    ) : (
        <AdminRoute>
            <AdminIsAuthor>
                <div className="site-layout-background">
                    <Row>
                        <Col span={20}>{renderTest()}</Col>
                        <Col span={4} style={{ textAlign: "center" }}>
                            <CreateSectionForm />
                        </Col>
                    </Row>
                </div>
            </AdminIsAuthor>
        </AdminRoute>
    );
};

TestId.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default TestId;
