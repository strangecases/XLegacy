import {
    Card,
    Row,
    Col,
    Form,
    Radio,
    Space,
    Input,
    Button,
    Divider,
    Popconfirm,
    message,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { EDIT_ANSWER } from "../../store/types";
import allActions from "../../store/actions";
import SegmentedSections from "./SegmentedSections";

const ExamDetail = () => {
    const [question, setQuestion] = useState({});

    const { questions } = useSelector((state) => state);
    const { answers } = useSelector((state) => state);
    const { selectedQuestion, selectedSectionNo, selectedSectionId } =
        useSelector((state) => state.custom);
    const { examId } = useSelector((state) => state.exam);

    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { isDirty, isSubmitting },
        control,
        setValue,
    } = useForm({
        mode: "onBlur",
        defaultValues: {},
    });

    const onSubmit = (data) => {
        console.log(data);
        dispatch({ type: EDIT_ANSWER, payload: data });
    };

    const onSectionSubmit = async () => {
        dispatch(allActions.customActions.examSaved(true));
        setTimeout(() => {
            dispatch(allActions.examActions.onSectionSubmit(id, testId));
            if (localStorage.getItem("end_date") != null)
                localStorage.removeItem("end_date");
            message.success("Successfully saved your work", 4);
            // dispatch(allActions.customActions.examSaved(false));
        }, 1000);
    };

    const onSectionCancel = () => {
        message.error("Continue Test");
        dispatch(allActions.customActions.examSaved(false));
    };

    useEffect(() => {
        if (
            selectedQuestion &&
            questions &&
            questions[selectedQuestion] &&
            questions[selectedQuestion].options
        ) {
            setQuestion(questions[selectedQuestion]);
        } else {
            setQuestion({});
        }
    }, [selectedQuestion, questions]);

    useEffect(() => {
        if (answers[selectedQuestion]) {
            setValue("answer", answers[selectedQuestion]);
        } else {
            setValue("answer", "");
        }
    }, [selectedQuestion, answers]);

    useEffect(() => {
        const elements = document.getElementsByClassName("hiii2");
        for (let i = 0; i < elements.length; i += 1) {
            elements[i].addEventListener("change", handleSubmit(onSubmit));
        }

        return () => {
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].removeEventListener(
                    "change",
                    handleSubmit(onSubmit)
                );
            }
        };
    }, []);

    return (
        <>
            {/* <Card
                bordered={false}
                style={{
                    margin: "1vh 0.5vh",
                    overflow: "none",
                }}
            >
                <Card
                    type="inner"
                    bordered={false}
                    style={{
                        padding: "2.5vh",
                        background: "#f0efed",
                        borderRadius: "6px",
                    }}
                > */}
            {/* {selectedQuestion &&
                questions &&
                questions[selectedQuestion] &&
                questions[selectedQuestion].options ? (
                    <>
                        <div>{questions[selectedQuestion].question}</div>
                        <div>{questions[selectedQuestion].options.a}</div>
                        <div>{questions[selectedQuestion].options.b}</div>
                        <div>{questions[selectedQuestion].options.c}</div>
                        <div>{questions[selectedQuestion].options.d}</div>
                    </>
                ) : (
                    "hii"
                )} */}
            {/* {question && question.options ? ( */}
            <SegmentedSections />
            <Form onFinish={handleSubmit(onSubmit)}>
                <Card
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflow: "none",
                // }}
                >
                    <Row gutter={16}>
                        <Col xs={8} md={6} lg={3} span={3}>
                            {/* <Card
                                        type="inner"
                                        bordered={false}
                                        style={{
                                            // padding: "0.5vh",
                                            background: "#eeff82",
                                            // borderRadius: "6px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {question.questionNo}
                                    </Card> */}
                            <Controller
                                style={{
                                    position: "fixed",
                                }}
                                value={setValue("questionNo", selectedQuestion)}
                                control={control}
                                name="questionNo"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        style={{
                                            textAlign: "center",
                                        }}
                                        readOnly
                                    />
                                )}
                            />
                        </Col>
                        <Col xs={16} md={18} lg={21} span={21}>
                            <Card
                                type="inner"
                                bordered={false}
                                className="exam-detail-inner-card"
                                // style={{
                                //     padding: "0.5vh",
                                //     background: "#eeff82",
                                //     borderRadius: "6px",
                                //     overflow: "hidden",
                                // }}
                            >
                                {question.question}
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflow: "none",
                // }}
                >
                    <Card
                        type="inner"
                        bordered={false}
                        className="inner-card-padding"
                        // style={{
                        //     // padding: "0.5vh",
                        //     background: "#f0efed",
                        //     // borderRadius: "6px",
                        //     overflow: "hidden",
                        // }}
                    >
                        <Controller
                            defaultValue="c"
                            control={control}
                            name="answer"
                            render={({ field }) => (
                                <Radio.Group
                                    {...field}
                                    style={{ width: "55vw" }}
                                >
                                    <Row>
                                        <Col span={20}>
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={16}
                                                        span={16}
                                                    >
                                                        <Card
                                                            hoverable
                                                            className="option-card inner-card-padding-zero"
                                                        >
                                                            <Radio
                                                                className="hiii2"
                                                                value="a"
                                                            >
                                                                {question.options &&
                                                                    question
                                                                        .options
                                                                        .a}
                                                            </Radio>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={16}
                                                        span={16}
                                                    >
                                                        <Card
                                                            hoverable
                                                            className="option-card"
                                                        >
                                                            <Radio
                                                                className="hiii2"
                                                                value="b"
                                                            >
                                                                {question.options &&
                                                                    question
                                                                        .options
                                                                        .b}
                                                            </Radio>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={16}
                                                        span={16}
                                                    >
                                                        <Card
                                                            hoverable
                                                            className="option-card"
                                                        >
                                                            <Radio
                                                                className="hiii2"
                                                                value="c"
                                                            >
                                                                {question.options &&
                                                                    question
                                                                        .options
                                                                        .c}
                                                            </Radio>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={16}
                                                        span={16}
                                                    >
                                                        <Card
                                                            hoverable
                                                            className="option-card"
                                                        >
                                                            <Radio
                                                                className="hiii2"
                                                                value="d"
                                                            >
                                                                {question.options &&
                                                                    question
                                                                        .options
                                                                        .d}
                                                            </Radio>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            )}
                        />
                        <Divider />
                        <Row justify="space-between">
                            <Col span={8}>
                                <Popconfirm
                                    title="Submitting will end the test and save your work. Are you sure about this?"
                                    onConfirm={onSectionSubmit}
                                    onCancel={onSectionCancel}
                                    okText="Yes"
                                >
                                    <Button
                                        onClick={() => {
                                            dispatch(
                                                allActions.customActions.examSaved(
                                                    true
                                                )
                                            );

                                            setTimeout(
                                                () =>
                                                    dispatch(
                                                        allActions.customActions.examSaved(
                                                            false
                                                        )
                                                    ),
                                                700
                                            );
                                        }}
                                        type="primary"
                                    >
                                        Submit
                                    </Button>
                                </Popconfirm>
                            </Col>
                            <Col span={8} offset={8}>
                                <Row gutter={32} justify="center">
                                    <Col span={5}>
                                        <LeftOutlined
                                            className="hover-icon-next test-submit-delete"
                                            onClick={() =>
                                                selectedQuestion > 1 &&
                                                dispatch(
                                                    allActions.customActions.selectedQuestion(
                                                        selectedQuestion - 1
                                                    )
                                                )
                                            }
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <RightOutlined
                                            className="hover-icon-next test-submit-delete"
                                            onClick={() =>
                                                selectedQuestion <
                                                    Object.values(questions)
                                                        .length &&
                                                dispatch(
                                                    allActions.customActions.selectedQuestion(
                                                        selectedQuestion + 1
                                                    )
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Form>
            {/* // ) : (
                //     "hi"
                // )} */}
            {/* </Card>
            </Card> */}
            {/* <Card
                bordered={false}
                style={{
                    margin: "1vh 0.5vh",
                    overflow: "none",
                }}
            >
                <Card
                    type="inner"
                    bordered={false}
                    style={{
                        padding: "2.5vh",
                        background: "#f0efed",
                        borderRadius: "6px",
                    }}
                >
                    <Button type="primary">Submit</Button>
                </Card>
            </Card> */}
        </>
    );
};

export default ExamDetail;
