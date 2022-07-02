import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    CloseCircleFilled,
    RightCircleFilled,
    CopyOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
import Link from "next/link";
import {
    Button,
    Row,
    Col,
    Card,
    Collapse,
    Space,
    Tooltip,
    Alert,
    Divider,
    Input,
} from "antd";
import CustomLayout from "../../../../../components/nav/CustomLayout";
import allActions from "../../../../../store/actions";
import CreateSectionForm from "../../../../../components/modal/modalSection/CreateSectionForm";
import AdminRoute from "../../../../../components/routes/AdminRoute";
import EditTestForm from "../../../../../components/modal/modalTest/EditTestForm";
import DeleteTestForm from "../../../../../components/modal/modalTest/DeleteTestForm";
import DeleteSectionForm from "../../../../../components/modal/modalSection/DeleteSectionForm";
import testsIndexStyle from "../../../../../styles/modules/pageStyles/TestsIndex.module.css";
import axiosFetch from "../../../../../axiosFetch";

const { Panel } = Collapse;

const TestId = () => {
    const router = useRouter();
    const { id, testId } = router.query;

    const [adminIsAuthor, setAdminIsAuthor] = useState(false);
    const [copied, setCopied] = useState(false);

    console.log(copied);

    const { tests } = useSelector((state) => state);
    const { schools } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                if (testId !== undefined) {
                    const { data } = await axiosFetch.get(
                        `/api/admin-is-author/${testId}`
                    );
                    if (data.ok) {
                        setAdminIsAuthor(true);
                    }
                }
            } catch (err) {
                console.log(err);
                setAdminIsAuthor(false);
            }
        };
        fetchAdmin();
    }, [testId]);

    useEffect(() => {
        if (testId !== undefined) {
            dispatch(allActions.testActions.fetchTest(id, testId));
            dispatch(allActions.schoolActions.fetchSchool(id));
        }
    }, [id, testId, router.query]);

    const dispatchSelectedSection = (sectionId, sectionNo) => {
        dispatch(allActions.customActions.selectedSectionId(sectionId));
        dispatch(allActions.customActions.selectedQuestion(1));
        dispatch(allActions.customActions.selectedSectionNo(sectionNo));
    };

    const showPopConfirm = (secNum, secId) => {
        dispatch(allActions.customActions.selectedSectionNo(secNum));
        dispatch(allActions.customActions.selectedSectionId(secId));
        dispatch(allActions.modalActions.visibleDeleteSectionYes());
    };

    const renderButton = () => {
        return (
            <Row gutter={6}>
                {adminIsAuthor && (
                    <Col span={16}>
                        <EditTestForm />
                    </Col>
                )}
                {adminIsAuthor ? (
                    <Col span={8}>
                        <DeleteTestForm />
                    </Col>
                ) : (
                    <Col span={8}>
                        <DeleteTestForm type="otherTests" />
                    </Col>
                )}
            </Row>
        );
    };

    const renderSection = () => {
        return (
            tests[testId] &&
            tests[testId].sectionData.map((section) => {
                return (
                    <Collapse
                        key={section.sectionId}
                        className={testsIndexStyle["tests-index-overflow"]}
                    >
                        <Panel header={section.subject} key={section.sectionId}>
                            <Row>
                                <Col xs={16} md={18} lg={20} span={20}>
                                    <p>{section.sectionDescription}</p>
                                </Col>
                                {adminIsAuthor && (
                                    <Col
                                        xs={8}
                                        md={6}
                                        lg={4}
                                        span={4}
                                        className={
                                            testsIndexStyle[
                                                "tests-index-section"
                                            ]
                                        }
                                    >
                                        <Space size={12}>
                                            <Link
                                                href={`/schools/${id}/tests/${testId}/sections`}
                                                passHref
                                            >
                                                <Tooltip
                                                    title="Edit Section"
                                                    placement="topRight"
                                                    color="#4287f5"
                                                >
                                                    <RightCircleFilled
                                                        onClick={() =>
                                                            dispatchSelectedSection(
                                                                section.sectionId,
                                                                section.sectionNo
                                                            )
                                                        }
                                                        className="hover-icon-edit test-submit-delete"
                                                    />
                                                </Tooltip>
                                            </Link>

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
                                                    className="hover-icon-delete test-submit-delete"
                                                />
                                            </Tooltip>
                                            <DeleteSectionForm />
                                        </Space>
                                    </Col>
                                )}
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
                title={tests[testId].testTitle}
                key={tests[testId]._id}
                extra={renderButton()}
                className={`${testsIndexStyle["tests-index-card"]} ${testsIndexStyle["tests-index-overflow"]}`}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    className={testsIndexStyle["tests-index-space"]}
                >
                    {renderSection()}
                </Space>
            </Card>
        );
    };

    return tests[testId] === undefined ? (
        <div>{}</div>
    ) : (
        <AdminRoute>
            <div>
                <Row gutter={[8, 14]} justify="center">
                    <Col span={24}>
                        <Alert
                            message={`This test was written by ${
                                tests[testId].author.name || "sumanth"
                            } for ${
                                tests[testId].school.schoolName ||
                                "sri chaitanya"
                            } school`}
                            type="info"
                            showIcon
                            closable
                        />
                    </Col>
                    <Col span={24}>
                        <Card
                            className={`inner-card-padding-small ${testsIndexStyle["tests-index-overflow"]}`}
                        >
                            <Row gutter={[8, 16]}>
                                <Col
                                    xs={24}
                                    sm={12}
                                    md={12}
                                    lg={16}
                                    xl={18}
                                    span={18}
                                    className={
                                        testsIndexStyle[
                                            "tests-index-schoolname"
                                        ]
                                    }
                                >
                                    {schools[id] &&
                                        schools[id].schoolName.toUpperCase()}
                                </Col>
                                <Col offset={0}>
                                    {/* <Row
                                        justify={
                                            adminIsAuthor
                                                ? "space-between"
                                                : "end"
                                        }
                                        gutter={0}
                                    >
                                        <Col
                                            xs={adminIsAuthor ? 12 : 5}
                                            sm={adminIsAuthor ? 12 : 5}
                                            span={12}
                                        > */}
                                    <Space size={14}>
                                        <Link
                                            href={`/schools/${id}/tests/${testId}/results`}
                                            passHref
                                        >
                                            <Button
                                                className={
                                                    testsIndexStyle[
                                                        "tests-index-button"
                                                    ]
                                                }
                                            >
                                                Results
                                            </Button>
                                        </Link>
                                        {/* </Col> */}
                                        {adminIsAuthor && (
                                            // <Col
                                            //     xs={12}
                                            //     sm={12}
                                            //     span={12}
                                            //     className={
                                            //         testsIndexStyle[
                                            //             "tests-index-align"
                                            //         ]
                                            //     }
                                            // >
                                            <CreateSectionForm
                                                length={
                                                    tests[testId].sectionData
                                                        .length
                                                }
                                            />
                                            // </Col>
                                        )}
                                    </Space>
                                    {/* </Row> */}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={20}>{renderTest()}</Col>

                    {tests && tests[testId].isPublished && (
                        <Col span={20}>
                            <Card
                                className={`inner-card-padding-small ${testsIndexStyle["tests-index-published"]}`}
                            >
                                <Divider
                                    orientation="left"
                                    className="inner-divider"
                                >
                                    Publish
                                </Divider>
                                <Card className="inner-card-padding inner-card-padding-small">
                                    <Input.Group
                                        compact
                                        className={
                                            testsIndexStyle["tests-index-align"]
                                        }
                                    >
                                        <Input
                                            className={
                                                testsIndexStyle[
                                                    "tests-index-input"
                                                ]
                                            }
                                            defaultValue={`http://localhost:3000/schools/${id}/exams/${testId}/info`}
                                            readOnly
                                        />
                                        <Tooltip
                                            title="copy url"
                                            color="#4287f5"
                                            placement="topLeft"
                                        >
                                            <CopyToClipboard
                                                text={
                                                    id &&
                                                    testId &&
                                                    `http://localhost:3000/schools/${id}/exams/${testId}/info`
                                                }
                                                onCopy={() => setCopied(true)}
                                            >
                                                <Button
                                                    icon={
                                                        !copied ? (
                                                            <CopyOutlined />
                                                        ) : (
                                                            <CheckCircleFilled
                                                                className={
                                                                    testsIndexStyle[
                                                                        "tests-index-button-icon"
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    }
                                                />
                                            </CopyToClipboard>
                                        </Tooltip>
                                    </Input.Group>
                                </Card>
                            </Card>
                        </Col>
                    )}
                </Row>
            </div>
        </AdminRoute>
    );
};

TestId.getLayout = (page) => <CustomLayout type="inside">{page}</CustomLayout>;

export default TestId;
