import { Button, Card, Row, Col, Tag } from "antd";
import { RightSquareFilled } from "@ant-design/icons";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomLayout from "../../components/nav/CustomLayout";
import allActions from "../../store/actions";
import AdminRoute from "../../components/routes/AdminRoute";
import schoolStyle from "../../styles/modules/pageStyles/Schools.module.css";

const Schools = () => {
    const { schools } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.schoolActions.fetchSchools());
    }, [dispatch]);

    const onRenderSchools = () => {
        return Object.values(schools).map((school) => {
            return (
                <Col key={school._id} xs={24} sm={12} md={8} span={24}>
                    <Card
                        className={schoolStyle["schools-index-card-height"]}
                        hoverable
                        title={school.schoolName}
                        extra={
                            <Link
                                href={`/schools/${school._id}/tests`}
                                passHref
                            >
                                <RightSquareFilled
                                    onClick={() =>
                                        dispatch(
                                            allActions.customActions.selectedClass(
                                                ""
                                            )
                                        )
                                    }
                                    className="school-submit-delete"
                                />
                            </Link>
                        }
                    >
                        <Row gutter={[16, 16]}>
                            <Col
                                span={24}
                                className={schoolStyle["school-index-tag"]}
                            >
                                <Tag color="#85ccb4">classes</Tag>
                            </Col>
                            {school &&
                                school.classes.map((cls) => (
                                    <Col key={cls.classNo}>
                                        <Link
                                            href={`/schools/${school._id}/tests`}
                                            passHref
                                        >
                                            <Button
                                                onClick={() =>
                                                    dispatch(
                                                        allActions.customActions.selectedClass(
                                                            cls.classNo
                                                        )
                                                    )
                                                }
                                            >
                                                {cls.classNo > 9
                                                    ? cls.classNo
                                                    : `0${cls.classNo}`}
                                            </Button>
                                        </Link>
                                    </Col>
                                ))}
                        </Row>
                    </Card>
                </Col>
            );
        });
    };

    return (
        <AdminRoute>
            <Row justify="" gutter={[16, 16]}>
                {onRenderSchools()}
            </Row>
            <h1 className={schoolStyle["school-index-add-button"]}>
                <Link href="/schools/new" passHref>
                    <Button danger>Add School</Button>
                </Link>
            </h1>
        </AdminRoute>
    );
};

Schools.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default Schools;
