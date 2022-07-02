import { useEffect } from "react";
import Link from "next/link";
import { Result, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../store/actions";
import ExamNav from "../components/nav/ExamNav";
import examSuccessStyle from "../styles/modules/pageStyles/ExamSuccess.module.css";
import Spinner from "../components/Spinner";

const ExamSuccess = () => {
    const { examSuccess } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const router = useRouter();
    console.log(examSuccess);

    useEffect(() => {
        if (examSuccess) {
            dispatch(allActions.examActions.deleteExam());
            dispatch(allActions.customActions.selectedSectionId(undefined));
        } else if (!examSuccess || examSuccess === "failure") {
            router.push("/");
        }
        return () => {
            console.log("when u fire");
            dispatch(allActions.customActions.examSuccess(""));
        };
    }, [examSuccess, dispatch, router]);

    return (
        <div className={examSuccessStyle["exam-success-position"]}>
            {examSuccess === "success" ? (
                <Result
                    status="success"
                    title="Successfully submitted your test."
                    subTitle="Your teacher will announce the results later."
                    extra={
                        <Link href="/" key="home" passHref>
                            <Button
                                className={
                                    examSuccessStyle["exam-success-button"]
                                }
                                type="primary"
                            >
                                Go Home
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <Spinner />
            )}
        </div>
    );
};

ExamSuccess.getLayout = (page) => <ExamNav>{page}</ExamNav>;

export default ExamSuccess;
