import {
    Form,
    Card,
    Button,
    Radio,
    Space,
    Divider,
    Row,
    Input,
    Col,
    Tooltip,
    message,
} from "antd";
import {
    CloseCircleFilled,
    RightOutlined,
    LeftOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
import { Controller, set, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FormItem from "../FormItem";
import { questionSchema } from "../../yupUtil";
import allActions from "../../store/actions";
import DeleteSectionForm from "../modal/modalSection/DeleteSectionForm";
import EditSectionForm from "../modal/modalSection/EditSectionForm";
import styles from "../../styles/modules/TopNav.module.css";
import FormOption from "../FormOption";

const QuestionDetail = () => {
    const { selectedQuestion, selectedSectionId } = useSelector(
        (state) => state.custom
    );
    const { tests } = useSelector((state) => state);
    const { questions } = useSelector((state) => state);

    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();

    let section;
    if (id && tests[id]) {
        section = tests[id].sectionData.find((x) => {
            return x.sectionId === selectedSectionId;
        });
    }

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        control,
        setValue,
        setError,
    } = useForm({
        mode: "onBlur",
        defaultValues: {},
        resolver: yupResolver(questionSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        dispatch(allActions.questionActions.editQuestion(data));
    };

    useEffect(() => {
        if (
            questions[selectedQuestion] &&
            questions[selectedQuestion].options &&
            questions[selectedQuestion].answer &&
            questions[selectedQuestion].question
        ) {
            setError("question", "");
            setError("answer", "");
            setError("options", "");

            setValue("options", {
                a: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.a
                    : "",
                b: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.b
                    : "",
                c: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.c
                    : "",
                d: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.d
                    : "",
            });

            setValue("answer", questions[selectedQuestion].answer);
            setValue("question", questions[selectedQuestion].question);

            console.log(questions[selectedQuestion]);
        } else {
            setValue("options", {
                a: "",
                b: "",
                c: "",
                d: "",
            });
            setValue("answer", "");
            setValue("question", "");
        }
    }, [selectedQuestion, questions]);

    useEffect(() => {
        const elements = document.getElementsByClassName("hiii");
        for (let i = 0; i < elements.length; i += 1) {
            elements[i].addEventListener("change", handleSubmit(onSubmit));
            console.log("gggg");
        }

        return () => {
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].removeEventListener(
                    "change",
                    handleSubmit(onSubmit)
                );
            }
        };

        // const element = document.getElementById("hii");
        // element.addEventListener("change", (e) => {
        //     if (e.target && e.target.matches("input[type='radio']")) {
        //         handleSubmit(onSubmit);
        //     }
        // });
        // return () => {
        //     element.removeEventListener("change", handleSubmit(onSubmit));
        // };
    }, []);

    const onAddQuestion = () => {
        const questionLength = Object.values(questions).length;
        console.log(questions[selectedQuestion]);
        if (questionLength >= 25) {
            console.log("cant add more than 25 questions");
        } else {
            dispatch(
                allActions.questionActions.editQuestion({
                    questionNo: questionLength + 1,
                })
            );
            dispatch(
                allActions.customActions.selectedQuestion(questionLength + 1)
            );
        }
    };

    const onDeleteQuestion = async () => {
        dispatch(allActions.questionActions.deleteQuestion(selectedQuestion));
        let questionList = Object.values(questions).slice(selectedQuestion);
        if (Object.values(questions).length > 0) {
            console.log("1", questionList);
            questionList = questionList.map((x) => {
                const d = { ...x };
                d.questionNo -= 1;
                return d;
            });
            console.log("2", questionList);
            dispatch(allActions.questionActions.upOnDeletion(questionList));
            dispatch(
                allActions.questionActions.deleteQuestion(
                    Object.values(questions).length
                )
            );
            console.log(questions);
            dispatch(
                allActions.customActions.selectedQuestion(selectedQuestion - 1)
            );
            console.log(selectedQuestion);
        }
    };

    const onSave = async () => {
        const questionsList = Object.values(questions);
        await axios.patch(
            `/api/prepare/tests/${id}/sections/${selectedSectionId}`,
            { questions: questionsList }
        );
        toast.success("hii", {
            hideProgressBar: true,
            autoClose: 1200,
        });
    };

    const showPopConfirm = () => {
        dispatch(allActions.customActions.visibleDeleteSectionYes());
    };

    return (
        <>
            {console.log("ree render")}
            <Card
                bordered={false}
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflow: "none",
                // }}
            >
                <Card
                    type="inner"
                    bordered={false}
                    // style={{
                    //     padding: "2.5vh",
                    //     background: "#f0efed",
                    //     borderRadius: "6px",
                    // }}
                >
                    <Form onFinish={handleSubmit(onSubmit)}>
                        <Row gutter={16}>
                            <Col xs={6} sm={4} lg={3} span={3}>
                                <Controller
                                    value={setValue(
                                        "questionNo",
                                        selectedQuestion
                                    )}
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
                            <Col xs={13} sm={16} lg={17} span={17}>
                                <FormItem
                                    control={control}
                                    errors={errors}
                                    name="question"
                                    placeholder="Enter Question"
                                    type="text"
                                />
                            </Col>
                            <Col xs={5} sm={4} md={4} lg={3} span={3}>
                                <Row
                                    gutter={{
                                        xs: 32,
                                        sm: 16,
                                        md: 28,
                                        lg: 32,
                                    }}
                                >
                                    <Col
                                        xs={8}
                                        sm={8}
                                        md={6}
                                        lg={8}
                                        xl={5}
                                        span={8}
                                    >
                                        <Tooltip
                                            title="Save Question"
                                            placement="bottom"
                                            color="#71a832"
                                            // style={{ marginRight: "auto" }}
                                        >
                                            <CheckCircleFilled
                                                onClick={handleSubmit(onSubmit)}
                                                // style={{
                                                //     fontSize: 20,
                                                //     color: "#939090",
                                                // }}
                                                className="hover-icon-submit test-submit-delete"
                                            />
                                        </Tooltip>
                                    </Col>
                                    <Col
                                        xs={8}
                                        sm={8}
                                        md={6}
                                        lg={8}
                                        xl={5}
                                        span={8}
                                    >
                                        <Tooltip
                                            title="Delete Question"
                                            placement="bottom"
                                            color="#f20707"
                                        >
                                            <CloseCircleFilled
                                                onClick={onDeleteQuestion}
                                                // style={{
                                                //     fontSize: 20,
                                                //     color: "#939090",
                                                // }}
                                                className="hover-icon-delete test-submit-delete"
                                            />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Controller
                                    defaultValue="c"
                                    control={control}
                                    name="answer"
                                    render={({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            style={{ width: "55vw" }}
                                            id="hii"
                                        >
                                            <Row>
                                                <Col span={24}>
                                                    <Space
                                                        direction="vertical"
                                                        style={{
                                                            display: "flex",
                                                        }}
                                                    >
                                                        <Row gutter={16}>
                                                            <Col
                                                                xs={2}
                                                                lg={2}
                                                                xl={1}
                                                                span={2}
                                                            >
                                                                <Radio
                                                                    className="hiii"
                                                                    value="a"
                                                                />
                                                            </Col>
                                                            <Col
                                                                xs={16}
                                                                md={13}
                                                                lg={10}
                                                            >
                                                                {/* <ControllerInput
                                                                control={
                                                                    control
                                                                }
                                                                name="options.a"                                                                                                       
                                                            /> */}
                                                                <FormOption
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                    name="options.a"
                                                                    option="a"
                                                                    placeholder="Enter option"
                                                                    type="text"
                                                                    // width="25vw"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col
                                                                xs={2}
                                                                lg={2}
                                                                xl={1}
                                                                span={2}
                                                            >
                                                                <Radio
                                                                    className="hiii"
                                                                    value="b"
                                                                />
                                                            </Col>
                                                            <Col
                                                                xs={16}
                                                                md={13}
                                                                lg={10}
                                                            >
                                                                {/* <ControllerInput
                                                                control={
                                                                    control
                                                                }
                                                                name="options.b"
                                                                option="b"
                                                                x={setValue}
                                                            /> */}
                                                                <FormOption
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                    name="options.b"
                                                                    option="b"
                                                                    placeholder="Enter option"
                                                                    type="text"
                                                                    // width="25vw"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col
                                                                xs={2}
                                                                lg={2}
                                                                xl={1}
                                                                span={2}
                                                            >
                                                                <Radio
                                                                    className="hiii"
                                                                    value="c"
                                                                />
                                                            </Col>
                                                            <Col
                                                                xs={16}
                                                                md={13}
                                                                lg={10}
                                                            >
                                                                {/* <ControllerInput
                                                                control={
                                                                    control
                                                                }
                                                                name="options.c"
                                                                option="c"
                                                                x={setValue}
                                                            /> */}
                                                                <FormOption
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                    name="options.c"
                                                                    option="c"
                                                                    placeholder="Enter option"
                                                                    type="text"
                                                                    // width="25vw"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col
                                                                xs={2}
                                                                lg={2}
                                                                xl={1}
                                                                span={2}
                                                            >
                                                                <Radio
                                                                    className="hiii"
                                                                    value="d"
                                                                />
                                                            </Col>
                                                            <Col
                                                                xs={16}
                                                                md={13}
                                                                lg={10}
                                                            >
                                                                {/* <ControllerInput
                                                                control={
                                                                    control
                                                                }
                                                                name="options.d"
                                                                option="d"
                                                                x={setValue}
                                                            /> */}
                                                                <FormOption
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                    name="options.d"
                                                                    option="d"
                                                                    placeholder="Enter option"
                                                                    type="text"
                                                                    // width="25vw"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Radio.Group>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Form>
                    <Divider />
                    <Row>
                        <Col span={8}>
                            <Button
                                danger
                                onClick={handleSubmit(onAddQuestion)}
                                // style={{ marginRight: 20 }}
                            >
                                Add Question
                            </Button>
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
            <Card
                bordered={false}
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflow: "none",
                // }}
            >
                <Card
                    type="inner"
                    bordered={false}
                    // style={{
                    //     padding: "0vh",
                    //     background: "#f0efed",
                    //     borderRadius: "6px",
                    // }}
                    className="inner-card-padding"
                >
                    <Row>
                        <Col
                            xs={{ span: 7, offset: 1 }}
                            lg={{ span: 5, offset: 1 }}
                        >
                            <Button type="primary" onClick={onSave}>
                                save
                            </Button>
                        </Col>
                        <Col
                            xs={{ span: 7, offset: 1 }}
                            lg={{ span: 3, offset: 8 }}
                        >
                            {section && <EditSectionForm section={section} />}
                        </Col>
                        <Col xs={{ span: 7, offset: 1 }} lg={{ span: 3 }}>
                            <Button onClick={showPopConfirm} danger>
                                Delete Section
                            </Button>
                            <DeleteSectionForm />
                        </Col>
                    </Row>
                </Card>
            </Card>
        </>
    );
};

export default QuestionDetail;
