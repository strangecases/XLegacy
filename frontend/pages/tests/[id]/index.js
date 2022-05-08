import { useEffect, useMemo } from "react";
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
import EditTestForm from "../../../components/modal/modalTest/EditTestForm";
import DeleteTestForm from "../../../components/modal/modalTest/DeleteTestForm";
import DeleteSectionForm from "../../../components/modal/modalSection/DeleteSectionForm";

const { Panel } = Collapse;

const TestId = () => {
    const router = useRouter();
    const { id } = router.query;

    const { tests } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(allActions.testActions.fetchTest(id));
        }
    }, [id, router.query]);

    const dispatchSelectedSection = (sectionId) => {
        dispatch(allActions.customActions.selectedSectionId(sectionId));
        dispatch(allActions.customActions.selectedQuestion(1));
    };

    const showPopConfirm = (secNum, secId) => {
        dispatch(allActions.customActions.selectedSectionNo(secNum));
        dispatch(allActions.customActions.selectedSectionId(secId));
        dispatch(allActions.customActions.visibleDeleteSectionYes());
    };

    const renderButton = () => {
        return (
            <Row gutter={6}>
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
        return (
            tests[id] &&
            tests[id].sectionData.map((section) => {
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
                                        gutter={10}
                                    >
                                        <Col span={18}>
                                            <Link
                                                href={`/tests/${id}/sections`}
                                                passHref
                                                style={{
                                                    height: 0,
                                                    lineHeight: 0,
                                                    verticalAlign: 0,
                                                }}
                                            >
                                                <Tooltip
                                                    title="Edit Section"
                                                    placement="topRight"
                                                    color="#4287f5"
                                                >
                                                    <RightCircleFilled
                                                        onClick={() =>
                                                            dispatchSelectedSection(
                                                                section.sectionId
                                                            )
                                                        }
                                                        // style={{
                                                        //     fontSize: 20,
                                                        //     color: "#0755f0",
                                                        //     top: 0,
                                                        // }}
                                                        className="hover-icon-edit test-submit-delete"
                                                        // className="hover-icon-delete-edit test-submit-delete-edit"
                                                    />
                                                </Tooltip>
                                            </Link>
                                        </Col>
                                        <Col span={6}>
                                            <Tooltip
                                                title="Delete Section"
                                                placement="topLeft"
                                                color="red"
                                            >
                                                <CloseCircleFilled
                                                    onClick={() =>
                                                        showPopConfirm(
                                                            section.sectionNo,
                                                            section.sectionId
                                                        )
                                                    }
                                                    // style={{
                                                    //     fontSize: 20,
                                                    //     color: "#939090",
                                                    //     paddingTop: 5,
                                                    // }}
                                                    className="hover-icon-delete test-submit-delete"
                                                />
                                            </Tooltip>
                                            <DeleteSectionForm />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                );
            })
        );
    };

    const renderTest = () => {
        return (
            <Card
                title={tests[id].testTitle}
                key={tests[id]._id}
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

    return tests[id] === undefined ? (
        <div>{}</div>
    ) : (
        <AdminRoute>
            <AdminIsAuthor>
                <div className="site-layout-background">
                    <Row>
                        <Col span={20}>{renderTest()}</Col>
                        <Col span={4} style={{ textAlign: "center" }}>
                            <CreateSectionForm
                                length={tests[id].sectionData.length}
                            />
                        </Col>
                    </Row>
                </div>
            </AdminIsAuthor>
        </AdminRoute>
    );
};

TestId.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default TestId;
