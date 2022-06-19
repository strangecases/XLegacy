import { Card, Col, Divider, Row, Table, Input, Select } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import CustomLayout from "../../../../../../components/nav/CustomLayout";
import DonutChart from "../../../../../../components/DonutChart";
import allActions from "../../../../../../store/actions";
import AdminRoute from "../../../../../../components/routes/AdminRoute";
import classAbrv from "../../../../../../utils";
import resultStyle from "../../../../../../styles/modules/pageStyles/Results.module.css";

const { Column } = Table;
const { Option } = Select;

const Results = () => {
    const ress = useRef(0);

    const router = useRouter();
    const { id, testId } = router.query;

    const { tests } = useSelector((state) => state);
    const { donutExams, outOf, examsList } = useSelector((state) => state.exam);
    const { schools } = useSelector((state) => state);

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
    }, [id, testId]);

    useEffect(() => {
        ress.current += 1;
    });

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
                        <Col span={11}>
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
                                                    .groups.map((grp) => {
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

                        <Col span={11}>
                            <Card
                                className={
                                    resultStyle["results-index-overflow"]
                                }
                            >
                                <DonutChart donutExams={donutExams} />
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
                                                    <a>{text}</a>
                                                </Link>
                                            );
                                        }}
                                        key="studentName"
                                        fixed="left"
                                        width={170}
                                        align="center"
                                    />
                                    <Column
                                        title="Class"
                                        dataIndex="classNo"
                                        key="classNo"
                                        fixed="left"
                                        width={100}
                                        align="center"
                                    />
                                    <Column
                                        title="Group/Section"
                                        dataIndex="classGroup"
                                        key="classGroup"
                                        fixed="left"
                                        width={130}
                                        align="center"
                                    />
                                    <ColumnGroup
                                        align="center"
                                        title="Test sections ( score / #questions )"
                                        key="testSection"
                                    >
                                        {tests[testId] &&
                                            tests[testId].sectionData &&
                                            tests[testId].sectionData.map(
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
                                        fixed="right"
                                        title={<MemoizedTitle />}
                                        dataIndex="marks"
                                        key="marks"
                                        sorter={(a, b) => a.marks - b.marks}
                                        width={130}
                                        align="center"
                                    />
                                </Table>
                            </Card>
                            <Card>{ress.current}</Card>
                        </Col>
                    </>
                )}
            </Row>
        </AdminRoute>
    );
};

Results.getLayout = (page) => <CustomLayout type="inside">{page}</CustomLayout>;

export default Results;
