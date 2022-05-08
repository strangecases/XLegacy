import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { Button, Card, Row, Col } from "antd";
import CustomLayout from "../../components/nav/CustomLayout";
import allActions from "../../store/actions";
import CreateTestForm from "../../components/modal/modalTest/CreateTestForm";
import AdminRoute from "../../components/routes/AdminRoute";

const TestId = () => {
    const tests = useSelector((state) => Object.values(state.tests));

    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(allActions.customActions.visibleTestYes());
    };

    useEffect(() => {
        const getTest = async () => {
            // const res = await axios.get(`/api/prepare/tests`);
            dispatch(allActions.testActions.fetchTests());
        };
        getTest();
    }, [dispatch]);

    const renderTests = () => {
        return tests.map((test) => {
            return (
                <Card
                    title={test.testTitle}
                    key={test._id}
                    extra={
                        <Link href={`/tests/${test._id}`} passHref>
                            <Button>More</Button>
                        </Link>
                    }
                    style={{ marginBottom: 20 }}
                >
                    <p>{test.classNo}</p>
                    <p>{test.testTime}</p>
                </Card>
            );
        });
    };

    return (
        <AdminRoute>
            <div className="site-layout-background">
                <Row>
                    <Col span={20}>{renderTests()}</Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                        <Button type="primary" onClick={showModal}>
                            Add Test
                        </Button>
                        <CreateTestForm />
                    </Col>
                </Row>
            </div>
        </AdminRoute>
    );
};

TestId.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default TestId;
