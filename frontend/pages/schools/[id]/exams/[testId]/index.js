import { useEffect } from "react";
import { Spin, Modal, message } from "antd";

import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import ExamNav from "../../../../../components/nav/ExamNav";
import Questions from "../../../../../components/questions/Questions";
import allActions from "../../../../../store/actions";

const ExamsId = () => {
    const { examId } = useSelector((state) => state.exam);
    const { examSaved } = useSelector((state) => state.custom);

    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

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
                style: { top: 15 },
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
                window.history.pushState("", "", router.asPath);
            }
            // if (window.confirm(warningText)) return;
            confirm();
            router.events.emit("routeChangeError");
            throw "routeChange aborted.";
        };

        const handleWindowClose = (e) => {
            e.preventDefault();
            // return (e.returnValue = warningText);
        };

        const preventBack = () => {
            window.addEventListener("beforeunload", handleWindowClose);
            router.events.on("routeChangeStart", historyChange);
        };

        if (!examSaved) {
            preventBack();
        } else if (examSaved) {
            console.log("removed");
            window.removeEventListener("beforeunload", handleWindowClose);
            router.events.off("routeChangeStart", historyChange);
        }
        console.log("exam saved", examSaved);

        return () => {
            window.removeEventListener("beforeunload", handleWindowClose);
            router.events.off("routeChangeStart", historyChange);
        };
    }, [examSaved, router]);

    useEffect(() => {
        if (!examId) {
            localStorage.removeItem("end_date");
            router.push(`/schools/${id}/exams/${testId}/info`);
        }
    }, [examId, id, testId]);

    return examId && examId ? (
        <Questions />
    ) : (
        <Spin
            size="large"
            style={{ position: "relative", top: "21vh", left: "45%" }}
            indicator={<SyncOutlined spin style={{ fontSize: 72 }} />}
        />
    );
};

ExamsId.getLayout = (page) => <ExamNav>{page}</ExamNav>;

export default ExamsId;
