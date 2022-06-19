import { useSelector } from "react-redux";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import ExamCountDown from "./ExamCountDown";
import antNavStyle from "../../styles/modules/componentStyles/AntNav.module.css";

const { Item } = Menu;

const ExamNav = ({ children, type = "exam" }) => {
    const { tests } = useSelector((state) => state);
    const { examData } = useSelector((state) => state.exam);

    const router = useRouter();
    const { testId } = router.query;

    // useEffect(() => {
    //     if (path.includes("exams") && !examId) {
    //         router.push(`/schools/${id}/exams/${testId}/info`);
    //     }
    // }, [examId, id, testId]);
    console.log("examnav");

    return (
        // mount && (
        <>
            <Menu
                mode="horizontal"
                // onClick={(e) => setCurrent(e.key)}
                selectedKeys="#"
                className={antNavStyle["exam-nav-menu"]}
            >
                <Item
                    key="/"
                    icon={<AppstoreOutlined />}
                    className={antNavStyle["header-bold"]}
                >
                    ScholarX
                </Item>

                {type === "exam" && (
                    <>
                        <Item key="#" className={antNavStyle["exam-nav-item"]}>
                            {/* <Countdown
                        value={
                            tests &&
                            tests[testId] &&
                            // Date.now() + tests[testId].testTime * 1000 * 60
                            Date.now() +
                                1000 *
                                    parseInt(ress.current && ress.current, 10)
                            // parseInt(window.localStorage.getItem("timer"), 10)
                        }
                        onChange={onChange}
                    /> */}

                            {tests[testId] && (
                                <ExamCountDown time={tests[testId].testTime} />
                            )}
                        </Item>
                        <Item key="2" className="margin-left-auto">
                            {examData && examData.studentName}
                        </Item>
                    </>
                )}
            </Menu>

            {children}
        </>
    );
    // );
};

export default ExamNav;
