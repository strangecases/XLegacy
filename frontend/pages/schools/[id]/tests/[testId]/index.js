import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
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
    Badge,
} from "antd";
import allActions from "../../../../../store/actions";
import CreateSectionForm from "../../../../../components/modal/modalSection/CreateSectionForm";
import AdminRoute from "../../../../../components/routes/AdminRoute";
import EditTestForm from "../../../../../components/modal/modalTest/EditTestForm";
import DeleteTestForm from "../../../../../components/modal/modalTest/DeleteTestForm";
import DeleteSectionForm from "../../../../../components/modal/modalSection/DeleteSectionForm";
import testsIndexStyle from "../../../../../styles/modules/pageStyles/TestsIndex.module.css";
import AdminCustomLayout from "../../../../../components/nav/adminCustom/AdminCustomLayout";
import useAuthorization from "../../../../../hooks/use-authorization";

const { Panel } = Collapse;

const TestId = () => {
    const router = useRouter();
    const { id, testId } = router.query;

    const [copied, setCopied] = useState(false);

    // console.log(copied);

    const { tests, schools } = useSelector((state) => state);

    const dispatch = useDispatch();

    const { ok: adminIsAuthor } = useAuthorization({
        link: testId && `/api/admin-is-author/${testId}`,
        routeLink: "",
        messageShow: "",
    });

    useEffect(() => {
        if (testId !== undefined) {
            dispatch(allActions.testActions.fetchTest(id, testId));
            dispatch(allActions.schoolActions.fetchSchool(id));
        }
    }, [id, testId, router.query, dispatch]);

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

    const otherTestsClassMsg = () => {
        dispatch(allActions.schoolActions.otherTestsClassMsg(id));
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
            /* sectionData */
            tests[testId] &&
            tests[testId].sections.map((section) => {
                return (
                    <Collapse
                        key={section._id}
                        className={`${
                            testsIndexStyle["tests-index-overflow"]
                        } ${
                            section.isEmpty &&
                            testsIndexStyle["tests-index-is-empty"]
                        }`}
                        // style={section.isEmpty ? { background: "#ffa3a3" } : {}}
                    >
                        <Panel
                            header={
                                <div
                                    className={
                                        testsIndexStyle[
                                            "tests-index-header-text"
                                        ]
                                    }
                                >
                                    <span>{section.subject}</span>
                                    {section.isFull && (
                                        <Badge
                                            status="success"
                                            text="Full"
                                            className={
                                                testsIndexStyle[
                                                    "tests-index-badge"
                                                ]
                                            }
                                        />
                                    )}
                                </div>
                            }
                            // key={section._id}
                        >
                            <Row align="middle">
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
                                                    overlayClassName="tooltip-mobile-display-none"
                                                >
                                                    <RightCircleFilled
                                                        onClick={() =>
                                                            dispatchSelectedSection(
                                                                section._id,
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
                                                color="#ec5e5e"
                                                overlayClassName="tooltip-mobile-display-none"
                                            >
                                                <CloseCircleFilled
                                                    onClick={() =>
                                                        showPopConfirm(
                                                            section.sectionNo,
                                                            section._id
                                                        )
                                                    }
                                                    className="test-delete test-submit-delete"
                                                />
                                            </Tooltip>
                                            <DeleteSectionForm />
                                        </Space>
                                    </Col>
                                )}
                            </Row>
                            {section.isEmpty && (
                                <div
                                    className={
                                        testsIndexStyle[
                                            "tests-index-error-message"
                                        ]
                                    }
                                >
                                    This Section is empty, either write some
                                    questions or delete this section
                                </div>
                            )}
                            {section.isFull && (
                                <div
                                    className={
                                        testsIndexStyle[
                                            "tests-index-full-message"
                                        ]
                                    }
                                >
                                    This Section has reached the limit of number
                                    of questions (25) allowed.
                                </div>
                            )}
                        </Panel>
                    </Collapse>
                );
            })
        );
    };

    const renderTest = () => {
        return (
            <Card
                /* sectionData */
                title={
                    tests[testId].sections.length > 0 ? (
                        <Link
                            href={`/schools/${id}/tests/${testId}/view-sections`}
                        >
                            <a
                                className={
                                    testsIndexStyle["tests-index-link-color"]
                                }
                            >
                                {tests[testId].testTitle}
                            </a>
                        </Link>
                    ) : (
                        tests[testId].testTitle
                    )
                }
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

    return tests[testId] === undefined ? null : (
        <AdminRoute>
            <div>
                <Row gutter={[8, 14]} justify="center">
                    <Col span={24}>
                        {schools[id] && schools[id]?.otherTestsClassMsg ? (
                            <Alert
                                message={
                                    <Marquee
                                        pauseOnHover
                                        gradient={false}
                                        loop={2}
                                        speed={50}
                                        delay={2}
                                    >
                                        {schools[id].otherTestsClassMsg}
                                    </Marquee>
                                }
                                type="success"
                                action={
                                    <Space>
                                        <Link href={`/schools/${id}/edit`}>
                                            <Button
                                                passHref
                                                size="small"
                                                type="ghost"
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                    </Space>
                                }
                                closable
                                onClose={otherTestsClassMsg}
                                className={testsIndexStyle["tests-index-alert"]}
                            />
                        ) : (
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
                                className={testsIndexStyle["tests-index-alert"]}
                            />
                        )}
                    </Col>
                    <Col span={24}>
                        <Card
                            className={`inner-card-padding-small ${testsIndexStyle["tests-index-overflow"]}`}
                        >
                            <div className={testsIndexStyle["display-flex"]}>
                                <div
                                    className={`
                                    ${testsIndexStyle["school-name-div"]} ${testsIndexStyle["tests-index-schoolname"]}
                                `}
                                >
                                    {schools[id] &&
                                        schools[id].schoolName.toUpperCase()}
                                </div>
                                {adminIsAuthor ? (
                                    <div
                                        className={
                                            testsIndexStyle["button-space"]
                                        }
                                    >
                                        <div>
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
                                        </div>
                                        <div
                                            className={`
                                                ${testsIndexStyle["button-margin-left"]}`}
                                        >
                                            <CreateSectionForm
                                                /* sectionData */
                                                length={
                                                    tests[testId].sections
                                                        .length
                                                }
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            testsIndexStyle[
                                                "button-only-result-flex"
                                            ]
                                        }
                                    >
                                        <Link
                                            href={`/schools/${id}/tests/${testId}/results`}
                                            passHref
                                        >
                                            <Button
                                                className={`
                                                 ${testsIndexStyle["tests-index-button"]} ${testsIndexStyle["button-only-result-width"]}`}
                                            >
                                                Results
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={21} sm={20} span={20}>
                        {renderTest()}
                    </Col>

                    {tests && tests[testId].isPublished && (
                        <Col xs={21} sm={20} span={20}>
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
                                            defaultValue={`${
                                                process.env
                                                    .NEXT_PUBLIC_NODE_ENV ===
                                                "development"
                                                    ? process.env
                                                          .NEXT_PUBLIC_FRONT_URL_DEV
                                                    : process.env
                                                          .NEXT_PUBLIC_FRONT_URL
                                            }/schools/${id}/exams/${testId}/info`}
                                            readOnly
                                        />
                                        <Tooltip
                                            title="copy url"
                                            color="#4287f5"
                                            placement="topLeft"
                                            overlayClassName="tooltip-mobile-display-none"
                                        >
                                            <CopyToClipboard
                                                text={
                                                    id &&
                                                    testId &&
                                                    `${
                                                        process.env
                                                            .NEXT_PUBLIC_NODE_ENV ===
                                                        "development"
                                                            ? process.env
                                                                  .NEXT_PUBLIC_FRONT_URL_DEV
                                                            : process.env
                                                                  .NEXT_PUBLIC_FRONT_URL
                                                    }/schools/${id}/exams/${testId}/info`
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

TestId.getLayout = (page) => (
    <AdminCustomLayout type="inside">{page}</AdminCustomLayout>
);

export default TestId;
