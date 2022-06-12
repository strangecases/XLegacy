import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button, Card, Row, Col, Select, Pagination, Input, Form } from "antd";
import { useRouter } from "next/router";
import CustomLayout from "../../../../components/nav/CustomLayout";
import allActions from "../../../../store/actions";
import CreateTestForm from "../../../../components/modal/modalTest/CreateTestForm";
import AddOtherTests from "../../../../components/schools/AddOtherTests";
import AdminIsSchoolAdmin from "../../../../components/routes/AdminIsSchoolAdmin";

const { Option } = Select;

const TestId = () => {
    const date = new Date();
    const fullYear = date.getFullYear();

    const tests = useSelector((state) => Object.values(state.tests));
    const { schools } = useSelector((state) => state);
    const { totalTests, selectedClass } = useSelector((state) => state.custom);

    const router = useRouter();
    const { id } = router.query;

    // const [classNo, setClassNo] = useState(selectedClass);
    const [year, setYear] = useState(fullYear);

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
            setYear(date.getFullYear());
            dispatch(allActions.testActions.fetchTests(id));
        } else {
            // setClassNo(classNoSelect);
            dispatch(allActions.customActions.selectedClass(classNoSelect));

            // onYearSelect(year);

            dispatch(
                allActions.schoolActions.fetchSchool(id, classNoSelect, year)
            );
        }
    };

    const onYearSelect = (yearSelect) => {
        setYear(yearSelect);
        dispatch(
            allActions.schoolActions.fetchSchool(id, selectedClass, yearSelect)
        );
    };

    const renderTests = () => {
        return tests.map((test) => {
            return (
                <Col xs={20} sm={20} lg={11} span={12} key={test._id}>
                    <Card
                        hoverable
                        title={test.testTitle}
                        extra={
                            <Link
                                href={`/schools/${id}/tests/${test._id}`}
                                passHref
                            >
                                <Button>More</Button>
                            </Link>
                        }
                        style={{ marginBottom: 20, borderRadius: 4 }}
                    >
                        <p>{test.classNo}</p>
                        <p>{test.testTime}</p>
                    </Card>
                </Col>
            );
        });
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
                        <Card
                            loading={
                                !schools[id].tests[selectedClass][year][0]
                                    .testTitle
                            }
                            hoverable
                            title={schoolTest.testTitle}
                            extra={
                                <Link
                                    href={`/schools/${id}/tests/${schoolTest._id}`}
                                    passHref
                                >
                                    <Button>More</Button>
                                </Link>
                            }
                            style={{
                                marginBottom: 20,
                                borderRadius: 4,
                                overflow: "hidden",
                            }}
                        >
                            <p> Class No : {schoolTest.classNo}</p>
                            <p>Test Time : {schoolTest.testTime}</p>
                        </Card>
                    </Col>
                );
            })
        ) : (
            <Col span={24}>
                <h6 style={{ textAlign: "center" }}>No tests Found</h6>
            </Col>
        );
    };

    const onPageChange = (page, pageSize) => {
        dispatch(allActions.testActions.fetchTests(id, page, pageSize));
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
                            style={{ overflow: "hidden" }}
                            extra={
                                <Row gutter={8}>
                                    <Col>
                                        <Link
                                            href={`/schools/${id}/edit`}
                                            passHref
                                        >
                                            <Button
                                                style={{
                                                    backgroundColor: "#22aff5",
                                                    borderColor: "#22aff5",
                                                    color: "white",
                                                }}
                                            >
                                                Edit School Details
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col
                                        span={6}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={showModal}
                                        >
                                            Add Test
                                        </Button>
                                        <CreateTestForm />
                                    </Col>
                                </Row>
                            }
                        >
                            <Row gutter={[8, 8]}>
                                <Col
                                    xs={24}
                                    sm={12}
                                    md={9}
                                    lg={5}
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        onChange={onClassNoSelect}
                                        defaultValue={selectedClass || `v`}
                                        value={selectedClass || `v`}
                                    >
                                        <Option value="v">All Tests</Option>
                                        {schools[id] &&
                                            schools[id].classes.map((cls) => {
                                                return (
                                                    <Option
                                                        values={cls.classNo}
                                                        key={cls.classNo}
                                                    >
                                                        {cls.classNo}th class
                                                    </Option>
                                                );
                                            })}
                                        <Option value="otherTests">
                                            Other Tests
                                        </Option>
                                    </Select>
                                </Col>
                                <Col
                                    xs={24}
                                    sm={12}
                                    md={9}
                                    lg={5}
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    <Select
                                        defaultValue={year}
                                        style={{ width: "100%" }}
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
                    {!year ||
                        (!selectedClass && (
                            <Col span={24}>
                                <Row justify="center">
                                    <Col>
                                        <Pagination
                                            defaultCurrent={1}
                                            total={totalTests}
                                            pageSize={4}
                                            pageSizeOptions={[4, 8, 16]}
                                            onChange={onPageChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        ))}
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
