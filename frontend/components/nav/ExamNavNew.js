import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import examNavNewStyle from "../../styles/modules/componentStyles/ExamNavNew.module.css";
import ExamCountDown from "./ExamCountDown";
import { stringOverflow } from "../../utils";

const ExamNavNew = ({ children, type = "intro" }) => {
    const [name, setName] = useState("");

    const { tests, exam } = useSelector((state) => state);
    const { examData } = exam;

    const router = useRouter();
    const { testId } = router.query;

    useEffect(() => {
        if (examData) setName(examData.studentName);
    }, [examData]);

    return (
        <>
            <header className={examNavNewStyle["exam-header"]}>
                <div
                    className={`${examNavNewStyle["exam-header-bold"]} ${
                        type !== "exam" && examNavNewStyle["exam-header-middle"]
                    }`}
                >
                    ScholarX
                </div>
                {type === "exam" && (
                    <>
                        {tests[testId] && (
                            <div className={examNavNewStyle["exam-countdown"]}>
                                <ExamCountDown time={tests[testId].testTime} />
                            </div>
                        )}

                        <div className={examNavNewStyle["exam-student-name"]}>
                            {stringOverflow(name, 12)}
                        </div>
                    </>
                )}
            </header>

            {children}
        </>
    );
};

export default ExamNavNew;
