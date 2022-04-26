import { Card } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExamDetail = () => {
    const [question, setQuestion] = useState({});
    const { questions } = useSelector((state) => state);
    const { selectedQuestion } = useSelector((state) => state.custom);

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

    return (
        <Card
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
                {question && question.options ? (
                    <>
                        <div>{question.question}</div>
                        <div>{question.options.a}</div>
                        <div>{question.options.b}</div>
                        <div>{question.options.c}</div>
                        <div>{question.options.d}</div>
                    </>
                ) : (
                    "hi"
                )}
            </Card>
        </Card>
    );
};

export default ExamDetail;
