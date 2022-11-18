import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Badge } from "antd";
import allActions from "../../store/actions";
import questionStyle from "../../styles/modules/componentStyles/Questions.module.css";
import { stringOverflow } from "../../utils";

const QuestionList = () => {
    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    const { tests } = useSelector((state) => state);
    const { questions } = useSelector((state) => state);
    const { answers } = useSelector((state) => state);

    const { selectedQuestion, selectedSectionId } = useSelector(
        (state) => state.custom
    );

    const dispatch = useDispatch();

    let questionsList;
    let sections;

    // useEffect(() => {
    //     if (questions) {
    //         questionsList = Object.values(questions);
    //     }
    //     console.log(questionsList);
    // }, [questions]);

    /* sectionData-- */

    if (testId !== null && tests[testId]) {
        sections = tests[testId].sections;
    }

    if (questions) {
        questionsList = Object.values(questions);
    }

    const onQuestionClick = (quesionNo) => {
        dispatch(allActions.questionsDrawerActions.questionsDrawer(false));
        dispatch(allActions.customActions.selectedQuestion(quesionNo));
    };

    const onSectionClick = async (sectionId, sectionNo) => {
        dispatch(allActions.questionsDrawerActions.questionsDrawer(false));
        if (sectionId !== selectedSectionId) {
            dispatch(allActions.loadingActions.questionsLoading(true));
            dispatch(
                allActions.questionActions.onSectionClick({
                    testId,
                    sectionId,
                    sectionNo,
                })
            );
        }
    };

    const onSectionExamClick = async (sectionId, sectionNo) => {
        dispatch(allActions.questionsDrawerActions.questionsDrawer(false));
        if (sectionId !== selectedSectionId) {
            dispatch(allActions.loadingActions.questionsLoading(true));
            dispatch(
                allActions.examActions.onSectionChange(
                    id,
                    testId,
                    sectionId,
                    sectionNo
                )
            );
        }
    };

    const onMapQuestions = () => {
        return questionsList.map((question) => {
            return (
                <Col
                    key={question.questionNo}
                    // offset={1}
                    xl={4}
                    lg={6}
                    md={6}
                    sm={4}
                    xs={6}
                    span={4}
                    onClick={() => onQuestionClick(question.questionNo)}
                >
                    <Badge
                        status="success"
                        dot={
                            path && path.includes("tests")
                                ? question.answer
                                : answers[question.questionNo]
                        }
                    >
                        <Button
                            type={
                                selectedQuestion === question.questionNo
                                    ? "primary"
                                    : ""
                            }
                        >
                            {question.questionNo <= 9
                                ? `0${question.questionNo}`
                                : question.questionNo}
                        </Button>
                    </Badge>
                </Col>
            );
        });
    };

    // const onMapQuestions = () => {
    //     return (
    //         <Space size={[8, 16]} wrap style={{ justifyContent: "center" }}>
    //             {questionsList.map((question) => {
    //                 return (
    //                     // <Col
    //                     //     key={question.questionNo}
    //                     //     // offset={1}
    //                     //     xl={4}
    //                     //     lg={4}
    //                     //     md={6}
    //                     //     sm={8}
    //                     //     span={4}
    //                     //     onClick={() => onQuestionClick(question.questionNo)}
    //                     // >
    //                     <Badge
    //                         key={question.questionNo}
    //                         status="success"
    //                         dot={
    //                             path && path.includes("tests")
    //                                 ? question.answer
    //                                 : answers[question.questionNo]
    //                         }
    //                         onClick={() => onQuestionClick(question.questionNo)}
    //                     >
    //                         <Button
    //                             type={
    //                                 selectedQuestion === question.questionNo
    //                                     ? "primary"
    //                                     : ""
    //                             }
    //                         >
    //                             {question.questionNo <= 9
    //                                 ? `0${question.questionNo}`
    //                                 : question.questionNo}
    //                         </Button>
    //                     </Badge>
    //                     // </Col>
    //                 );
    //             })}
    //         </Space>
    //     );
    // };

    const onMapSections = () => {
        return sections.map((section) => {
            return (
                <Col key={section._id} offset={0} md={12} xs={12}>
                    <Button
                        type={
                            selectedSectionId === section._id ? "primary" : ""
                        }
                        className={questionStyle["question-list-button"]}
                        onClick={
                            path && path.includes("tests")
                                ? () =>
                                      onSectionClick(
                                          section._id,
                                          section.sectionNo
                                      )
                                : () =>
                                      onSectionExamClick(
                                          section._id,
                                          section.sectionNo
                                      )
                        }
                    >
                        {stringOverflow(section.subject, 9)}
                    </Button>
                </Col>
            );
        });
    };

    return (
        <>
            <Card
                bordered={false}
                size="small"
                title="Question Numbers"
                className="question-list-card"
            >
                <Card
                    type="inner"
                    bordered={false}
                    className="inner-card-padding-two"
                >
                    <Row gutter={[16, 16]}>
                        {questionsList && onMapQuestions()}
                    </Row>
                </Card>
            </Card>
            <Card
                bordered={false}
                size="small"
                title="Sections"
                className="question-list-card"
            >
                <Card
                    type="inner"
                    bordered={false}
                    className="inner-card-padding-two"
                >
                    <Row
                        justify="start"
                        gutter={[8, 16]}
                        className={questionStyle["question-list-overflow"]}
                    >
                        {/* <Space size={[60, 16]} align="center" wrap> */}
                        {sections && onMapSections()}
                        {/* </Space> */}
                    </Row>
                </Card>
            </Card>
        </>
    );
};

export default QuestionList;
