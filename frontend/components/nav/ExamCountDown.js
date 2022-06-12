import React, { useState, useEffect } from "react";
import { Statistic } from "antd";
import { useRouter } from "next/router";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions";

const ExamCountDown = ({ time = 40 }) => {
    const [countDownColor, setCountDownColor] = useState("green");

    const router = useRouter();
    const { id, testId } = router.query;
    const { answers } = useSelector((state) => state);

    const dispatch = useDispatch();

    const renderer = ({ hours, minutes, seconds }) => {
        const onFinish = () => {
            dispatch(allActions.examActions.onSectionSubmit(id, testId));
        };

        const onChange = (val) => {
            if (9.95 * 60 * 1000 < val && val < 10 * 60 * 1000) {
                setCountDownColor("red");
            }
        };
        return (
            <Statistic.Countdown
                onChange={onChange}
                onFinish={onFinish}
                value={
                    Date.now() +
                    hours * 60 * 60 * 1000 +
                    minutes * 60 * 1000 +
                    seconds * 1000
                }
                valueStyle={{ color: countDownColor }}
            />
        );
    };

    const getLocalStorageValue = (s) => localStorage.getItem(s);

    const [data, setData] = useState({
        date: Date.now(),
        delay: time * 60 * 1000,
    });

    console.log(data);
    console.log(Object.keys(answers).length, answers);

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
                if (localStorage.getItem("end_date") == null)
                    localStorage.setItem(
                        "end_date",
                        JSON.stringify(data.date + data.delay)
                    );
            }}
            onComplete={() => {
                if (localStorage.getItem("end_date") != null)
                    localStorage.removeItem("end_date");
                // if (answers && Object.keys(answers).length !== 0) {
                //     console.log(Object.keys(answers).length, answers);
                //     dispatch(
                //         allActions.examActions.onSectionSubmit(id, testId)
                //     );
                // }
            }}
        />
    );
};

export default ExamCountDown;
