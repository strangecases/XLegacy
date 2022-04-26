import { Card, Layout, Row, Col, Button } from "antd";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import ExamNav from "../../components/nav/ExamNav";
import allActions from "../../store/actions";

const Exams = () => {
    const tests = useSelector((state) => Object.values(state.tests));
    console.log(tests[0]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getTests = async () => {
            dispatch(allActions.testActions.fetchTests());
        };
        getTests();
    }, []);

    const onRenderTests = () => {
        return tests.map((test) => {
            return (
                <Col key={test._id} xs={24} md={12} lg={8}>
                    <Link href={`/exams/${test._id}`} passHref>
                        <Card
                            title={test.testTitle}
                            hoverable
                            style={{ borderRadius: 6 }}
                        >
                            <p>{test.classNo}</p>
                            <p>{test.testTime}</p>
                        </Card>
                    </Link>
                </Col>
            );
        });
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Row
                gutter={[16, 24]}
                justify="space-between"
                style={{ margin: "0 3vh", overflow: "none", paddingTop: 20 }}
            >
                {onRenderTests()}
            </Row>
        </Layout>
    );
};

Exams.getLayout = (page) => <ExamNav>{page}</ExamNav>;

export default Exams;
