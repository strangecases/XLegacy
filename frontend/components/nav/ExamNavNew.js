import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import examNavNewStyle from "../../styles/modules/componentStyles/ExamNavNew.module.css";
import ExamCountDown from "./ExamCountDown";
import { stringOverflow } from "../../utils";

const ExamNavNew = ({ children, type = "exam" }) => {
    const { tests } = useSelector((state) => state);
    const { examData } = useSelector((state) => state.exam);

    const router = useRouter();
    const { testId } = router.query;

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
                            {examData &&
                                stringOverflow(examData.studentName, 12)}
                        </div>
                    </>
                )}
            </header>

            {children}
        </>
    );
};

export default ExamNavNew;
