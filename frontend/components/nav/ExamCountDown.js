import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Countdown, { zeroPad } from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions";
import examNavNewStyle from "../../styles/modules/componentStyles/ExamNavNew.module.css";

const ExamCountDown = ({ time = 40 }) => {
    const [countDownColor, setCountDownColor] = useState("green");

    const router = useRouter();
    const { id, testId } = router.query;
    const { examId } = useSelector((state) => state.exam);

    const dispatch = useDispatch();

    const renderer = ({ hours, minutes, seconds }) => {
        return (
            <div
                style={{ color: countDownColor }}
                className={examNavNewStyle["exam-nav-count"]}
            >
                {zeroPad(hours)}
                <span className={examNavNewStyle["exam-nav-count-margin"]}>
                    :
                </span>
                {zeroPad(minutes)}
                <span className={examNavNewStyle["exam-nav-count-margin"]}>
                    :
                </span>
                {zeroPad(seconds)}
            </div>
        );
    };

    const getLocalStorageValue = (s) => localStorage.getItem(s);

    const [data, setData] = useState({
        date: Date.now(),
        delay: time * 60 * 1000,
    });

    useEffect(() => {
        const wantedDelay = time * 60 * 1000;
        const savedDate = getLocalStorageValue("end_date");
        if (savedDate != null && !Number.isNaN(savedDate)) {
            const currentTime = Date.now();
            const delta = parseInt(savedDate, 10) - currentTime;

            // Do you reach the end?
            if (delta > wantedDelay) {
                // Yes we clear uour saved end date
                if (localStorage.getItem("end_date").length > 0)
                    localStorage.removeItem("end_date");
            } else {
                // No update the end date with the current date
                setData({ date: currentTime, delay: delta });
            }
        }
    }, [time]);

    return (
        <Countdown
            date={data.date + data.delay}
            renderer={renderer}
            onStart={() => {
                // Save the end date
                if (localStorage.getItem("end_date") == null && examId)
                    localStorage.setItem(
                        "end_date",
                        JSON.stringify(data.date + data.delay)
                    );
            }}
            onComplete={() => {
                if (localStorage.getItem("end_date") != null)
                    localStorage.removeItem("end_date");

                dispatch(allActions.examActions.onSectionSubmit(id, testId));

                // if (answers && Object.keys(answers).length !== 0) {
                //     console.log(Object.keys(answers).length, answers);
                //     dispatch(
                //         allActions.examActions.onSectionSubmit(id, testId)
                //     );
                // }
            }}
            onTick={({ total }) => {
                if (total === 5 * 60 * 1000) {
                    setCountDownColor("red");
                }

                if (total === 2 * 1000) {
                    dispatch(allActions.customActions.examSaved(true));
                }
            }}
        />
    );
};

export default ExamCountDown;
