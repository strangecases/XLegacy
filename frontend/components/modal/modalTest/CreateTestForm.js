import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";

import TestFormGroup from "./TestFormGroup";
import ModalCreate from "../ModalCreate";
import { CREATE_TEST } from "../../../store/types";
import { testSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";

const CreateTestForm = () => {
    const { admin } = useSelector((state) => state.auth);

    const router = useRouter();
    // console.log(router.pathname);

    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        control,
    } = useForm({
        mode: "onBlur",

        resolver: yupResolver(testSchema),
    });

    const onSubmit = async (data) => {
        const x = { ...data, author: admin._id };
        const res = await axios.post("/api/prepare/tests", x);
        console.log(res.data);
        await dispatch({ type: CREATE_TEST, payload: res.data });
        await dispatch(allActions.customActions.visibleTestNo());
        router.push(`/tests/`);
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.customActions.visibleTestNo());
    };

    return (
        <ModalCreate
            onOk={handleSubmit(onSubmit)}
            handleCancel={onHandleCancel}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            title="Create Test"
        >
            {/* <div className="container col-md-10 offset-md-1">
                <Form id="myForm">
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
                </Form>
                <p className="text-center">
                    Go back to
                    <Link href="/admin">
                        <a> Dashboard</a>
                    </Link>
                </p>
            </div> */}
            <TestFormGroup control={control} errors={errors} />
        </ModalCreate>
    );
};

export default CreateTestForm;
