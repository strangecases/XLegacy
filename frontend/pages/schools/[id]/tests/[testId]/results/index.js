import { Card, Col, Divider, Row, Table, Input, Select } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import DonutChart from "../../../../../../components/adminUtil/DonutChart";
import allActions from "../../../../../../store/actions";
import AdminRoute from "../../../../../../components/routes/AdminRoute";
import { classAbrv } from "../../../../../../utils";
import resultStyle from "../../../../../../styles/modules/pageStyles/Results.module.css";
import AdminCustomLayout from "../../../../../../components/nav/adminCustom/AdminCustomLayout";

const { Column } = Table;
const { Option } = Select;

const Results = () => {
    const isTablet = useMediaQuery({ maxWidth: 820 });
    const isMobile = useMediaQuery({ maxWidth: 576 });

    // const ress = useRef(0);

    const router = useRouter();
    const { id, testId } = router.query;

    const { tests, schools, exam } = useSelector((state) => state);
    const { outOf, examsList } = exam;

    const dispatch = useDispatch();

    const MemoizedTitle = useCallback(
        () => (
            <div>
                Marks <br />
                {`(__/${outOf})`}
            </div>
        ),
        [outOf]
    );

    useEffect(() => {
        const examFn = async () => {
            dispatch(allActions.examActions.examsList(id, testId));
            dispatch(allActions.testActions.fetchTest(id, testId));
            dispatch(allActions.schoolActions.fetchSchool(id));
        };
        if (id && testId) examFn();

        return () => {
            dispatch(allActions.examActions.donutExams([], 0));
        };
    }, [id, testId, dispatch]);

    // useEffect(() => {
    //     ress.current += 1;
    // });

    const onGroupSelect = async (v) => {
        if (v === "v") {
            dispatch(
                allActions.examActions.examsList(
                    id,
                    testId,
                    "",
                    tests[testId].classNo
                )
            );
        } else {
            dispatch(
                allActions.examActions.examsList(
                    id,
                    testId,
                    v,
                    tests[testId].classNo
                )
            );
        }
    };

    return (
        <AdminRoute>
            <Row gutter={[8, 16]} justify="center">
                {examsList && (
                    <>
                        <Col xs={22} sm={22} md={11} lg={11} span={11}>
                            <Card
                                hoverable
                                title={
                                    schools[id] &&
                                    schools[id].schoolName.toUpperCase()
                                }
                                className={resultStyle["results-index-card"]}
                            >
                                <p>
                                    results for {tests[testId]?.testTitle} test
                                </p>
                                <Divider orientation="left">Search</Divider>
                                <Row gutter={8} justify="center">
                                    <Col span={8}>
                                        <Input
                                            className={
                                                resultStyle[
                                                    "results-index-input"
                                                ]
                                            }
                                            disabled
                                            name="classNo"
                                            value={
                                                tests[testId] &&
                                                `${
                                                    tests[testId].classNo
                                                }${classAbrv(
                                                    tests[testId].classNo
                                                )}`
                                            }
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Select
                                            defaultValue="v"
                                            className={
                                                resultStyle[
                                                    "results-index-select"
                                                ]
                                            }
                                            onChange={onGroupSelect}
                                            name="group"
                                        >
                                            <Option
                                                className={
                                                    resultStyle[
                                                        "results-index-input"
                                                    ]
                                                }
                                                key="v"
                                                value="v"
                                            >
                                                All
                                            </Option>
                                            {schools[id] &&
                                                tests[testId] &&
                                                schools[id].classes
                                                    .find((cls) => {
                                                        return (
                                                            parseInt(
                                                                cls.classNo,
                                                                10
                                                            ) ===
                                                            tests[testId]
                                                                .classNo
                                                        );
                                                    })
                                                    ?.groups.map((grp) => {
                                                        return (
                                                            <Option
                                                                className={
                                                                    resultStyle[
                                                                        "results-index-input"
                                                                    ]
                                                                }
                                                                key={grp.group}
                                                                value={
                                                                    grp.group
                                                                }
                                                            >{`group-${grp.group}`}</Option>
                                                        );
                                                    })}
                                        </Select>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col xs={22} sm={22} md={11} lg={11} span={11}>
                            <Card
                                className={
                                    resultStyle["results-index-overflow"]
                                }
                            >
                                <DonutChart />
                            </Card>
                        </Col>
                        <Col span={22}>
                            <Card>
                                <Table
                                    bordered
                                    dataSource={examsList}
                                    rowKey="_id"
                                    // columns={column}
                                    pagination={{
                                        defaultPageSize: 8,
                                        pageSizeOptions: ["8", "10", "16"],
                                        showSizeChanger: true,
                                    }}
                                    scroll={{ y: 500 }}
                                >
                                    <Column
                                        title="Name"
                                        dataIndex="studentName"
                                        render={(text, record) => {
                                            return (
                                                <Link
                                                    href={`/schools/${id}/tests/${testId}/results/${record._id}`}
                                                >
                                                    {/* {text} */}
                                                    {text?.length > 12 ? (
                                                        <a title={text}>
                                                            {text.slice(0, 12)}
                                                            ...
                                                        </a>
                                                    ) : (
                                                        <a>{text}</a>
                                                    )}
                                                </Link>
                                            );
                                        }}
                                        key="studentName"
                                        fixed={!isMobile && "left"}
                                        width={170}
                                        align="center"
                                    />
                                    <Column
                                        title="Class"
                                        dataIndex="classNo"
                                        key="classNo"
                                        fixed={!isTablet && "left"}
                                        width={100}
                                        align="center"
                                    />
                                    <Column
                                        title="Group/Section"
                                        dataIndex="classGroup"
                                        key="classGroup"
                                        fixed={!isTablet && "left"}
                                        width={110}
                                        align="center"
                                    />
                                    <ColumnGroup
                                        align="center"
                                        title="Test sections ( score / #questions )"
                                        width={150}
                                        key="testSection"
                                    >
                                        {tests[testId] &&
                                            /* sectionData */
                                            /* sectionData */
                                            tests[testId].sections &&
                                            tests[testId].sections.map(
                                                (section, sectionIndex) => {
                                                    return (
                                                        <Column
                                                            title={
                                                                section.subject
                                                            }
                                                            key={section._id}
                                                            dataIndex={[
                                                                "answers",
                                                                `${
                                                                    sectionIndex +
                                                                    1
                                                                }`,
                                                            ]}
                                                            render={(text) =>
                                                                `${
                                                                    (text &&
                                                                        text.sectionMarks) ||
                                                                    "-"
                                                                }/${
                                                                    (text &&
                                                                        text.sectionOutOf) ||
                                                                    "-"
                                                                }`
                                                            }
                                                            width={150}
                                                            align="center"
                                                        />
                                                    );
                                                }
                                            )}
                                    </ColumnGroup>
                                    <Column
                                        fixed={!isMobile ? "right" : ""}
                                        title={<MemoizedTitle />}
                                        dataIndex="marks"
                                        key="marks"
                                        sorter={(a, b) => a.marks - b.marks}
                                        width={130}
                                        align="center"
                                    />
                                </Table>
                            </Card>
                            {/* <Card>{ress.current}</Card> */}
                        </Col>
                    </>
                )}
            </Row>
        </AdminRoute>
    );
};

Results.getLayout = (page) => (
    <AdminCustomLayout type="inside">{page}</AdminCustomLayout>
);

export default Results;
