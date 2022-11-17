import { useEffect } from "react";
import Link from "next/link";
import { Result, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../store/actions";
import ExamNavNew from "../components/nav/ExamNavNew";
import examSuccessStyle from "../styles/modules/pageStyles/ExamSuccess.module.css";
import Spinner from "../components/Spinner";

const ExamSuccess = () => {
    const { examSuccess } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const router = useRouter();
    // console.log(examSuccess);

    useEffect(() => {
        if (examSuccess === "success") {
            dispatch(allActions.examActions.deleteExam());
            dispatch(allActions.customActions.selectedSectionId(undefined));
        } else if (!examSuccess) {
            router.push("/");
        }
        dispatch(allActions.loadingActions.examSavedLoading(false));
        dispatch(allActions.examActions.deleteExam());
        return () => {
            // console.log("when u fire");
            dispatch(allActions.customActions.examSuccess(""));
        };
    }, [examSuccess, dispatch, router]);

    return examSuccess === "success" ? (
        <div className={examSuccessStyle["exam-success-position"]}>
            <Result
                status="success"
                title="Successfully submitted your test."
                subTitle="Your teacher will announce the results later."
                extra={
                    <Link href="/" key="home" passHref>
                        <Button
                            className={examSuccessStyle["exam-success-button"]}
                            type="primary"
                        >
                            Go Home
                        </Button>
                    </Link>
                }
            />
        </div>
    ) : (
        <Spinner />
    );
};

ExamSuccess.getLayout = (page) => <ExamNavNew type="outro">{page}</ExamNavNew>;

export default ExamSuccess;
