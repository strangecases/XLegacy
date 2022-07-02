import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button, Card, Row, Col, Select, Pagination, Badge, Space } from "antd";
import { useRouter } from "next/router";
import CustomLayout from "../../../../components/nav/CustomLayout";
import allActions from "../../../../store/actions";
import CreateTestForm from "../../../../components/modal/modalTest/CreateTestForm";
import AddOtherTests from "../../../../components/schools/AddOtherTests";
import AdminIsSchoolAdmin from "../../../../components/routes/AdminIsSchoolAdmin";
import classAbrv from "../../../../utils";
import schoolTestsStyle from "../../../../styles/modules/pageStyles/SchoolTests.module.css";

const { Option } = Select;

const TestId = () => {
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

    // if (id && schools[id]) {
    //     setClassNo(schools[id].classes[0].classNo);
    // }

    useEffect(() => {
        const getTest = async () => {
            // const res = await axios.get(`/api/prepare/tests`);
            dispatch(allActions.testActions.fetchTests(id));
            dispatch(
                allActions.schoolActions.fetchSchool(id, selectedClass, year)
            );
        };

        // if (id) setClassNo(schools[id] && schools[id].classes[0].classNo);
        if (id) getTest();
    }, [id]);

    // useEffect(() => {
    //     if (id) {
    //         setClassNo(schools[id] && schools[id].classes[0].classNo);
    //     }
    // }, [id]);

    const onClassNoSelect = (classNoSelect) => {
        if (classNoSelect === "v") {
            // setClassNo("");
            dispatch(allActions.customActions.selectedClass(""));
            setFirstPage(1);
            setYear(date.getFullYear());
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
                    <Col xs={20} sm={20} lg={11} span={12} key={test._id}>
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
                                        schoolTestsStyle["school-tests-card"]
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
                <h6 className={schoolTestsStyle["school-tests-nothing"]}>
                    No tests Found
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
                    <Col xs={20} sm={20} lg={11} span={12} key={schoolTest._id}>
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
                                href={`/schools/${id}/tests/${schoolTest._id}`}
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
                                    // extra={
                                    //     <Link
                                    //         href={`/schools/${id}/tests/${schoolTest._id}`}
                                    //         passHref
                                    //     >
                                    //         <Button>More </Button>
                                    //     </Link>
                                    // }

                                    className={`${schoolTestsStyle["school-tests-card"]} ${schoolTestsStyle["school-tests-overflow"]}`}
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
                <h6 className={schoolTestsStyle["school-tests-nothing"]}>
                    No tests Found
                </h6>
            </Col>
        );
    };

    const onPageTestChange = (page, pageSize) => {
        setFirstPage(page);
        dispatch(allActions.testActions.fetchTests(id, page, pageSize));
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
        <AdminIsSchoolAdmin>
            <div className="">
                <Row gutter={[12, 16]} justify="center">
                    <Col span={24}>
                        <Card
                            size="small"
                            title={
                                schools[id] &&
                                schools[id].schoolName.toUpperCase()
                            }
                            className={`${schoolTestsStyle["school-tests-overflow"]} ant-card-mobile`}
                            extra={
                                // <Row justify="space-between" gutter={8}>
                                //     <Col xs={24} md={12}>
                                <Space wrap>
                                    <Link href={`/schools/${id}/edit`} passHref>
                                        <Button
                                            className={
                                                schoolTestsStyle[
                                                    "school-tests-button"
                                                ]
                                            }
                                        >
                                            Edit School Details
                                        </Button>
                                    </Link>
                                    {/* </Col> */}
                                    {/* <Col xs={24} md={12} span={6}> */}
                                    <Button type="primary" onClick={showModal}>
                                        Add Test
                                    </Button>
                                    <CreateTestForm />
                                </Space>
                                //     </Col>
                                // </Row>
                            }
                        >
                            <Row gutter={[8, 8]}>
                                <Col xs={24} sm={12} md={9} lg={5}>
                                    <Select
                                        className={
                                            schoolTestsStyle[
                                                "school-tests-select"
                                            ]
                                        }
                                        onChange={onClassNoSelect}
                                        defaultValue={selectedClass || `v`}
                                        value={selectedClass || `v`}
                                    >
                                        <Option
                                            className={
                                                schoolTestsStyle[
                                                    "school-tests-select"
                                                ]
                                            }
                                            value="v"
                                        >
                                            All Tests
                                        </Option>
                                        {schools[id] &&
                                            schools[id].classes.map((cls) => {
                                                return (
                                                    <Option
                                                        values={cls.classNo}
                                                        key={cls.classNo}
                                                        className={
                                                            schoolTestsStyle[
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
                                                schoolTestsStyle[
                                                    "school-tests-select"
                                                ]
                                            }
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
                                            schoolTestsStyle[
                                                "school-tests-select"
                                            ]
                                        }
                                        onChange={onYearSelect}
                                        value={year}
                                    >
                                        {schools[id] &&
                                            Object.keys(
                                                schools[id].tests &&
                                                    schools[id].tests[
                                                        selectedClass
                                                    ]
                                                    ? schools[id].tests[
                                                          selectedClass
                                                      ]
                                                    : {}
                                            ).map((ele) => {
                                                return (
                                                    <Option
                                                        className={
                                                            schoolTestsStyle[
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
                    {selectedClass === "otherTests" && (
                        <Col span={23}>
                            <AddOtherTests />
                        </Col>
                    )}
                    {year && selectedClass
                        ? renderConditionTests()
                        : renderTests()}
                    {/* {!year ||
                        (!selectedClass ? (
                            <Col span={24}>
                                <Row justify="center">
                                    <Col>
                                        <Pagination
                                            defaultCurrent={1}
                                            current={firstPage}
                                            total={!year || !selectedClass?totalTests:totalClassTests}
                                            pageSize={4}
                                            pageSizeOptions={[4, 8, 16]}
                                            onChange={!year || !selectedClass?onPageTestChange:onPageClassChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        ) : (
                            <Col span={24}>
                                <Row justify="center">
                                    <Col>
                                        <Pagination
                                            defaultCurrent={1}
                                            current={firstPage}
                                            total={totalClassTests}
                                            pageSize={4}
                                            pageSizeOptions={[4, 8, 16]}
                                            onChange={onPageClassChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        ))} */}

                    <Col span={24}>
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
                {/* <Row gutter={[0, 16]} justify="center">
                    <Col>
                        <Pagination
                            defaultCurrent={1}
                            total={60}
                            pageSize={8}
                            pageSizeOptions={[8, 16]}
                            onChange={onPageChange}
                        />
                    </Col>
                </Row> */}
            </div>
        </AdminIsSchoolAdmin>
    );
};

TestId.getLayout = (page) => <CustomLayout type="inside">{page}</CustomLayout>;

export default TestId;
