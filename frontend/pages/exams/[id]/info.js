import { Card, Form, Row, Col, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import FormItem from "../../../components/FormItem";
import allActions from "../../../store/actions";
import { examSchema } from "../../../yupUtil";
import { EMPTY_ANSWERS, EMPTY_QUESTIONS } from "../../../store/types";

const Info = () => {
    const router = useRouter();
    const { id } = router.query;

    const { examId } = useSelector((state) => state.exam);

    const dispatch = useDispatch();

    console.log(examId);

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(examSchema),
    });

    const onSubmit = async (data) => {
        const res = await axios.post(`/api/prepare/tests/${id}/exams`, data);
        console.log(res.data);
        dispatch(allActions.examActions.createExam(res.data));
        router.push(`/exams/${id}`);
    };

    useEffect(() => {
        dispatch({ type: EMPTY_ANSWERS });
        dispatch({ type: EMPTY_QUESTIONS });
        dispatch(allActions.customActions.selectedSectionId(undefined));
    }, []);

    return (
        <Row style={{ marginTop: 25 }}>
            <Col offset={7} span={10}>
                <Card>
                    <Form onFinish={handleSubmit(onSubmit)}>
                        <FormItem
                            control={control}
                            errors={errors}
                            name="studentName"
                            placeholder="Enter your name"
                            type="text"
                        />
                        <FormItem
                            control={control}
                            errors={errors}
                            name="schoolCode"
                            placeholder="Enter school code"
                            type="text"
                        />
                        <FormItem
                            control={control}
                            errors={errors}
                            name="classNo"
                            placeholder="Enter class"
                            type="number"
                        />
                        <FormItem
                            control={control}
                            errors={errors}
                            name="classGroup"
                            placeholder="Enter class group"
                            type="text"
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="col-12"
                            disabled={!isDirty || isSubmitting}
                        >
                            Next
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Info;
