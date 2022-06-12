import { useEffect } from "react";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import { Result, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../store/actions";
import ExamNav from "../components/nav/ExamNav";

const ExamSuccess = () => {
    const { examSuccess } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const router = useRouter();
    console.log(examSuccess);

    useEffect(() => {
        if (examSuccess) {
            dispatch(allActions.examActions.deleteExam());
        } else if (!examSuccess || examSuccess === "failure") {
            router.push("/");
        }
        return () => {
            console.log("when u fire");
            dispatch(allActions.customActions.examSuccess(""));
        };
    }, [examSuccess, dispatch, router]);

    return (
        <div style={{ position: "relative", top: "15vh" }}>
            {examSuccess === "success" ? (
                <Result
                    status="success"
                    title="Successfully submitted your test."
                    subTitle="Your teacher will announce the results later."
                    extra={
                        <Link href="/" key="home" passHref>
                            <Button
                                style={{
                                    color: "white",
                                    backgroundColor: "#0da5fc",
                                    borderColor: "#0da5fc",
                                }}
                                type="primary"
                            >
                                Go Home
                            </Button>
                        </Link>
                    }
                />
            ) : (
                // <Skeleton
                //     active
                //     paragraph={{ rows: 17, width: "100vw" }}
                //     title={{ width: "100vw" }}
                // />
                <Spin
                    size="large"
                    style={{ position: "relative", left: "45%" }}
                    indicator={<SyncOutlined spin style={{ fontSize: 72 }} />}
                />
            )}
        </div>
    );
};

ExamSuccess.getLayout = (page) => <ExamNav>{page}</ExamNav>;

export default ExamSuccess;
