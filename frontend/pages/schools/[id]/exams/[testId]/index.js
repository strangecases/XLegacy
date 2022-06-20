import { useEffect } from "react";
import { Modal, message } from "antd";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import ExamNav from "../../../../../components/nav/ExamNav";
import QuestionTests from "../../../../../components/Questions/QuestionTests";
import allActions from "../../../../../store/actions";
import examInfoStyle from "../../../../../styles/modules/pageStyles/ExamInfo.module.css";
import Spinner from "../../../../../components/Spinner";

const ExamsId = () => {
    const { examId } = useSelector((state) => state.exam);
    const { examSaved } = useSelector((state) => state.custom);

    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (path.includes("/exams") && !path.includes("/info")) {
    //         window.history.pushState(
    //             null,
    //             document.title,
    //             window.location.href
    //         );
    //         window.addEventListener("popstate", (event) => {
    //             window.history.pushState(
    //                 null,
    //                 document.title,
    //                 window.location.href
    //             );
    //         });
    //     }
    // }, [path]);

    useEffect(() => {
        const warningText =
            "You have unsaved changes - are you sure you wish to leave this page?";

        const confirm = () => {
            Modal.confirm({
                className: examInfoStyle["exam-modal-leave"],
                title: "Oh no!",
                content: warningText,
                okText: "Leave",
                cancelText: "Cancel",
                onOk: () => {
                    dispatch(
                        allActions.examActions.onSectionSubmit(id, testId)
                    );
                    dispatch(allActions.customActions.examSaved(true));
                    if (localStorage.getItem("end_date") != null)
                        localStorage.removeItem("end_date");
                    message.success("Successfully saved your work", 4);
                    return false;
                },
            });
        };

        const historyChange = (url) => {
            if (router.asPath !== window.location.pathname) {
                console.log(router.asPath, window.location.pathname);
                window.history.pushState({}, "", router.asPath);
            }

            if (router.asPath !== url) confirm();
            router.events.emit("routeChangeError");
            throw new Error("routeChange aborted.");
        };

        const handleWindowClose = (e) => {
            e.preventDefault();
            console.log(router.asPath === window.location.pathname);
            if (router.asPath === window.location.pathname) {
                e.returnValue = "fdfd";
            }
        };

        const preventBack = () => {
            window.addEventListener("beforeunload", handleWindowClose);
            router.events.on("routeChangeStart", historyChange);
        };

        if (!examSaved && id && testId) {
            preventBack();
        } else if (examSaved) {
            // window.removeEventListener("beforeunload", handleWindowClose);
            router.events.off("routeChangeStart", historyChange);
        }
        console.log(
            "exam saved",
            examSaved,
            router.asPath,
            window.location.pathname
        );

        return () => {
            window.removeEventListener("beforeunload", handleWindowClose);
            router.events.off("routeChangeStart", historyChange);
        };
    }, [examSaved, testId, id, router]);

    useEffect(() => {
        if (!examId) {
            localStorage.removeItem("end_date");
            router.push(`/schools/${id}/exams/${testId}/info`);
        }
    }, [examId, id, testId]);

    return examId && examId ? <QuestionTests /> : <Spinner />;
};

ExamsId.getLayout = (page) => <ExamNav>{page}</ExamNav>;

export default ExamsId;
