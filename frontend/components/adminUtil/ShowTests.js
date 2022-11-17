import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button, Card, Row, Col, Select, Pagination, Badge, Space } from "antd";
import { useRouter } from "next/router";
import allActions from "../../store/actions";
import CreateTestForm from "../modal/modalTest/CreateTestForm";
import AddOtherTests from "../schools/AddOtherTests";
import { classAbrv } from "../../utils";
import showTestsStyle from "../../styles/modules/componentStyles/ShowTests.module.css";

const { Option } = Select;

const ShowTest = ({ type = "admin" }) => {
    const date = new Date();
    const fullYear = date.getFullYear();

    const tests = useSelector((state) => Object.values(state.tests));
    const { schools } = useSelector((state) => state);
    const { totalTests, selectedClass, totalClassTests } = useSelector(
        (state) => state.custom
    );

    const router = useRouter();
    const { id } = router.query;

    // const [classNo, setClassNo] = useState(selectedClass);
    const [year, setYear] = useState(fullYear);
    const [firstPage, setFirstPage] = useState(1);

    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(allActions.modalActions.visibleTestYes());
    };

    useEffect(() => {
        const getTest = async () => {
            // const res = await axios.get(`/api/prepare/tests`);
            if (type !== "exam") {
                dispatch(allActions.testActions.fetchTests(id));
            }
            dispatch(
                allActions.schoolActions.fetchSchool(id, selectedClass, year)
            );
        };

        if (id) getTest();

        return () => {
            // console.log("clicked exam id", id);
            if (type === "exam") {
                // console.log("clicked exam");
                dispatch(allActions.customActions.selectedClass(""));
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onClassNoSelect = (classNoSelect) => {
        if (classNoSelect === "v") {
            // setClassNo("");
            dispatch(allActions.customActions.selectedClass(""));
            setFirstPage(1);
            setYear(date.getFullYear());
            if (type === "admin")
                dispatch(allActions.testActions.fetchTests(id));
        } else {
            // setClassNo(classNoSelect);
            dispatch(allActions.customActions.selectedClass(classNoSelect));
            setFirstPage(1);

            // onYearSelect(year);

            dispatch(
                allActions.schoolActions.fetchSchool(id, classNoSelect, year)
            );
        }
    };

    const onYearSelect = (yearSelect) => {
        setYear(yearSelect);
        setFirstPage(1);
        dispatch(
            allActions.schoolActions.fetchSchool(id, selectedClass, yearSelect)
        );
    };

    const renderTests = () => {
        return Object.keys(tests).length > 0 ? (
            tests.map((test) => {
                return (
                    <Col xs={21} sm={20} lg={11} key={test._id}>
                        <Badge.Ribbon
                            text={
                                test.isPublished ? "Published" : "Not published"
                            }
                            color={test.isPublished ? "green" : "#ec000cb0"}
                        >
                            <Link
                                href={`/schools/${id}/tests/${test._id}`}
                                passHref
                            >
                                <Card
                                    hoverable
                                    title={test.testTitle}
                                    className={
                                        showTestsStyle["school-tests-card"]
                                    }
                                >
                                    <p>{test.classNo}</p>
                                    <p>{test.testTime}</p>
                                </Card>
                            </Link>
                        </Badge.Ribbon>
                    </Col>
                );
            })
        ) : (
            <Col span={24}>
                <h6 className={showTestsStyle["school-tests-nothing"]}>
                    No tests Found
                </h6>
            </Col>
        );
    };

    const renderText = () => {
        return (
            <Col xs={20} sm={20} lg={9}>
                <h6 className={showTestsStyle["school-tests-nothing"]}>
                    Select class number for tests
                </h6>
            </Col>
        );
    };

    const renderConditionTests = () => {
        return schools[id] &&
            schools[id].tests &&
            schools[id].tests[selectedClass] &&
            schools[id].tests[selectedClass][year] &&
            schools[id].tests[selectedClass][year].length > 0 ? (
            schools[id].tests[selectedClass][year].map((schoolTest) => {
                return (
                    <Col
                        xs={(type === "admin" && 21) || (type === "exam" && 20)}
                        sm={20}
                        md={type === "admin" && 19}
                        lg={(type === "admin" && 11) || (type === "exam" && 9)}
                        key={schoolTest._id}
                    >
                        <Badge.Ribbon
                            text={
                                schoolTest.isPublished
                                    ? "Published"
                                    : "Not published"
                            }
                            color={
                                schoolTest.isPublished ? "green" : "#ec000cb0"
                            }
                        >
                            <Link
                                href={
                                    (type === "admin" &&
                                        `/schools/${id}/tests/${schoolTest._id}`) ||
                                    (type === "exam" &&
                                        (schoolTest.isPublished
                                            ? `/schools/${id}/exams/${schoolTest._id}/info`
                                            : `/schools/${id}/exams`))
                                }
                                passHref
                            >
                                <Card
                                    loading={
                                        !schools[id].tests[selectedClass][
                                            year
                                        ][0].testTitle
                                    }
                                    hoverable
                                    title={schoolTest.testTitle}
                                    className={`${
                                        showTestsStyle["school-tests-card"]
                                    } ${
                                        showTestsStyle["school-tests-overflow"]
                                    } ${
                                        type === "exam"
                                            ? showTestsStyle["exams-index-card"]
                                            : undefined
                                    }`}
                                >
                                    <p>
                                        {" "}
                                        Class No : {schoolTest.classNo}
                                        {classAbrv(schoolTest.classNo)}
                                    </p>
                                    <p>Test Time : {schoolTest.testTime} min</p>
                                </Card>
                            </Link>
                        </Badge.Ribbon>
                    </Col>
                );
            })
        ) : (
            <Col span={24}>
                <h6 className={showTestsStyle["school-tests-nothing"]}>
                    No tests Found
                </h6>
            </Col>
        );
    };

    const onPageTestChange = (page, pageSize) => {
        if (type === "admin") {
            setFirstPage(page);
            dispatch(allActions.testActions.fetchTests(id, page, pageSize));
        }
    };

    const onPageClassChange = (page, pageSize) => {
        setFirstPage(page);
        dispatch(
            allActions.schoolActions.fetchSchool(
                id,
                selectedClass,
                year,
                page,
                pageSize
            )
        );
    };

    return (
        <div>
            <Row
                gutter={[
                    { xs: 12, lg: 16 },
                    { xs: 12, sm: 12, lg: 16 },
                ]}
                justify="center"
                className={
                    type === "exam"
                        ? showTestsStyle["exams-index-row"]
                        : undefined
                }
            >
                <Col span={(type === "admin" && 24) || (type === "exam" && 20)}>
                    <Card
                        size="small"
                        title={
                            schools[id] && schools[id].schoolName.toUpperCase()
                        }
                        className={`${showTestsStyle["school-tests-overflow"]} ant-card-mobile`}
                        extra={
                            type === "admin" && (
                                <Space wrap>
                                    <Link href={`/schools/${id}/edit`} passHref>
                                        <Button
                                            className={
                                                showTestsStyle[
                                                    "school-tests-button"
                                                ]
                                            }
                                            type="dashed"
                                        >
                                            Edit School
                                        </Button>
                                    </Link>

                                    <Button type="primary" onClick={showModal}>
                                        Add Test
                                    </Button>
                                    <CreateTestForm />
                                </Space>
                            )
                        }
                    >
                        <Row gutter={[8, 8]}>
                            <Col xs={24} sm={12} md={9} lg={5}>
                                <Select
                                    className={
                                        showTestsStyle["school-tests-select"]
                                    }
                                    onChange={onClassNoSelect}
                                    defaultValue={selectedClass || `v`}
                                    value={selectedClass || `v`}
                                >
                                    <Option
                                        className={
                                            showTestsStyle[
                                                "school-tests-select"
                                            ]
                                        }
                                        key="v"
                                        value="v"
                                    >
                                        {(type === "admin" && "All Tests") ||
                                            (type === "exam" && "Select Class")}
                                    </Option>

                                    {/* {type === "exam" && (
                                        <Option value="v">Select Class</Option>
                                    )} */}

                                    {schools[id] &&
                                        schools[id].classes.map((cls) => {
                                            return (
                                                <Option
                                                    values={cls.classNo}
                                                    key={cls.classNo}
                                                    className={
                                                        showTestsStyle[
                                                            "school-tests-select"
                                                        ]
                                                    }
                                                >
                                                    {cls.classNo}
                                                    {classAbrv(cls.classNo)}
                                                </Option>
                                            );
                                        })}
                                    <Option
                                        className={
                                            showTestsStyle[
                                                "school-tests-select"
                                            ]
                                        }
                                        key="otherTests"
                                        value="otherTests"
                                    >
                                        Other Tests
                                    </Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={9} lg={5}>
                                <Select
                                    defaultValue={year}
                                    className={
                                        showTestsStyle["school-tests-select"]
                                    }
                                    onChange={onYearSelect}
                                    value={year}
                                >
                                    {schools[id] &&
                                        Object.keys(
                                            schools[id].tests &&
                                                schools[id].tests[selectedClass]
                                                ? schools[id].tests[
                                                      selectedClass
                                                  ]
                                                : {}
                                        ).map((ele) => {
                                            return (
                                                <Option
                                                    className={
                                                        showTestsStyle[
                                                            "school-tests-select"
                                                        ]
                                                    }
                                                    key={ele}
                                                    value={ele}
                                                >
                                                    {ele}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {selectedClass === "otherTests" && type === "admin" && (
                    <Col span={23}>
                        <AddOtherTests />
                    </Col>
                )}
                {year && selectedClass
                    ? renderConditionTests()
                    : (type === "admin" && renderTests()) ||
                      (type === "exam" && renderText())}

                <Col
                    span={
                        totalClassTests > 4 &&
                        year &&
                        selectedClass &&
                        type === "exam"
                            ? 24
                            : (type === "exam" && `0`) ||
                              (type === "admin" && 24)
                    }
                >
                    <Row justify="center">
                        <Col>
                            <Pagination
                                defaultCurrent={1}
                                current={firstPage}
                                total={
                                    !year || !selectedClass
                                        ? totalTests
                                        : totalClassTests
                                }
                                pageSize={4}
                                pageSizeOptions={[4, 8, 16]}
                                onChange={
                                    !year || !selectedClass
                                        ? onPageTestChange
                                        : onPageClassChange
                                }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default ShowTest;
