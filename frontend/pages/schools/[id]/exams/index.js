import { Card, Layout, Row, Col, Select, Badge } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import ExamNav from "../../../../components/nav/ExamNav";
import allActions from "../../../../store/actions";
import classAbrv from "../../../../utils";
import examStyle from "../../../../styles/modules/pageStyles/Exams.module.css";

const { Option } = Select;

const Exams = () => {
    const dispatch = useDispatch();

    const date = new Date();
    const fullYear = date.getFullYear();

    const { schools } = useSelector((state) => state);
    const { selectedClass } = useSelector((state) => state.custom);

    const router = useRouter();
    const { id } = router.query;

    const [year, setYear] = useState(fullYear);

    useEffect(() => {
        const getTest = async () => {
            dispatch(allActions.customActions.selectedClass(""));
        };

        getTest();
    }, []);

    const onClassNoSelect = (classNoSelect) => {
        if (classNoSelect === "v") {
            dispatch(allActions.customActions.selectedClass(""));
            setYear(date.getFullYear());
        } else {
            dispatch(allActions.customActions.selectedClass(classNoSelect));

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
        return (
            <Col xs={20} sm={20} lg={9} span={12}>
                <h6 className={examStyle["exams-index-nothing"]}>
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
                    <Col xs={20} sm={20} lg={9} span={10} key={schoolTest._id}>
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
                                    schoolTest.isPublished
                                        ? `/schools/${id}/exams/${schoolTest._id}/info`
                                        : `/schools/${id}/exams`
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
                                    className={examStyle["exams-index-card"]}
                                >
                                    <p>Class No : {schoolTest.classNo}</p>
                                    <p>Test Time : {schoolTest.testTime}</p>
                                </Card>
                            </Link>
                        </Badge.Ribbon>
                    </Col>
                );
            })
        ) : (
            <Col span={24}>
                <h6 className={examStyle["exams-index-nothing"]}>
                    No tests Found
                </h6>
            </Col>
        );
    };

    return (
        <Layout className={examStyle["exams-index-layout"]}>
            <div className="">
                <Row
                    gutter={[12, 16]}
                    justify="center"
                    className={examStyle["exams-index-row"]}
                >
                    <Col span={20}>
                        <Card
                            size="small"
                            title={
                                schools[id] &&
                                schools[id].schoolName.toUpperCase()
                            }
                            className={examStyle["exams-index-overflow"]}
                        >
                            <Row gutter={[8, 8]}>
                                <Col xs={24} sm={12} md={9} lg={5}>
                                    <Select
                                        className={
                                            examStyle["exams-index-select"]
                                        }
                                        onChange={onClassNoSelect}
                                        defaultValue={selectedClass || "v"}
                                        value={selectedClass || "v"}
                                    >
                                        <Option value="v">Select Class</Option>
                                        {schools[id] &&
                                            schools[id].classes.map((cls) => {
                                                return (
                                                    <Option
                                                        values={cls.classNo}
                                                        key={cls.classNo}
                                                    >
                                                        {cls.classNo}
                                                        {classAbrv(cls.classNo)}
                                                    </Option>
                                                );
                                            })}
                                        <Option value="otherTests">
                                            Other Tests
                                        </Option>
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={9} lg={5}>
                                    <Select
                                        defaultValue={year}
                                        className={
                                            examStyle["exams-index-select"]
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
                    {year && selectedClass
                        ? renderConditionTests()
                        : renderTests()}
                </Row>
            </div>
        </Layout>
    );
};

Exams.getLayout = (page) => <ExamNav type="intro">{page}</ExamNav>;

export default Exams;
