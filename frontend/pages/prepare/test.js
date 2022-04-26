import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Form } from "antd";

import AdminRoute from "../../components/routes/AdminRoute";
import { CREATE_TEST } from "../../store/types";
import FormItem from "../../components/FormItem";

const schema = yup.object().shape({
    testTitle: yup
        .string()
        .max(50, "title should be max 50 words")
        .required("title is required"),
    testTime: yup
        .number()
        .typeError("test time must be a number")
        .max(100, "tests should not be more than 100 min")
        .required("test time is required"),
    classNo: yup
        .number()
        .typeError("class number must be a number")
        .min(6, "tests start with class 6")
        .max(12, "tests end with class 12")
        .required("class number is required"),
    testCode: yup.string().required("test code is required"),
});

const Test = () => {
    const { admin } = useSelector((state) => state.auth);

    const router = useRouter();

    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        control,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const x = { ...data, author: admin._id };
        console.log(x);
        // const res = await axios.post("/api/prepare/tests", x);
        // console.log(res.data);
        // dispatch({ type: CREATE_TEST, payload: res.data });
        // router.push(`/tests/${res.data._id}`);
    };

    return (
        <AdminRoute>
            {console.log(errors)}
            <h1 className="jumbotron text-center bg-primary">Create Test</h1>
            <div className="container col-md-6 offset-md-3 pb-5">
                <Form onFinish={handleSubmit(onSubmit)}>
                    <FormItem
                        control={control}
                        errors={errors}
                        name="testTitle"
                        placeholder="Enter test title"
                        type="text"
                    />
                    <FormItem
                        control={control}
                        errors={errors}
                        name="testTime"
                        placeholder="Enter test time"
                        type="number"
                    />
                    <FormItem
                        control={control}
                        errors={errors}
                        name="classNo"
                        placeholder="Enter class number"
                        type="number"
                    />
                    <FormItem
                        control={control}
                        errors={errors}
                        name="testCode"
                        placeholder="Enter test code"
                        type="text"
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary col-12"
                        disabled={!isDirty || isSubmitting}
                    >
                        {isSubmitting ? <SyncOutlined spin /> : "Submit"}
                    </Button>
                </Form>

                <p className="text-center pt-3">
                    Go back to
                    <Link href="/admin">
                        <a>Dashboard</a>
                    </Link>
                </p>
            </div>
        </AdminRoute>
    );
};

export default Test;
