import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import TestFormGroup from "./TestFormGroup";
import ModalCreate from "../ModalCreate";
import { EDIT_TEST } from "../../../store/types";
import { testSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";

const EditTestForm = () => {
    const { admin } = useSelector((state) => state.auth);
    const { tests } = useSelector((state) => state);

    const router = useRouter();
    const { id } = router.query;
    // console.log(router.pathname);

    const dispatch = useDispatch();

    const showTestModal = () => {
        dispatch(allActions.customActions.visibleTestYes());
    };

    let defaultValues;
    if (id !== undefined) {
        const { testTitle, testCode, classNo, testTime } = tests[id];
        defaultValues = { testTitle, testCode, classNo, testTime };
    }

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        control,
    } = useForm({
        mode: "onBlur",
        defaultValues: { ...defaultValues },
        resolver: yupResolver(testSchema),
    });

    const onEditSubmit = async (data) => {
        const x = { ...data };
        console.log(x);
        const res = await axios.patch(`/api/prepare/tests/${id}`, x);
        console.log(res.data);
        await dispatch({ type: EDIT_TEST, payload: res.data.test });
        await dispatch(allActions.customActions.visibleTestNo());
        router.push(`/tests/${id}`);
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.customActions.visibleTestNo());
    };

    return (
        <>
            <Tooltip placement="topRight" title="Edit Test" color="#108ee7">
                <PlusCircleFilled
                    onClick={showTestModal}
                    // style={{ fontSize: 20, color: "#20f540" }}
                    className="hover-icon-edit-test test-submit-delete"
                />
            </Tooltip>
            <ModalCreate
                onOk={handleSubmit(onEditSubmit)}
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                title="Create Test"
                handleCancel={onHandleCancel}
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
        </>
    );
};

export default EditTestForm;
