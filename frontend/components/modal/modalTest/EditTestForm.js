import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { PlusCircleFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import TestFormGroup from "./TestFormGroup";
import ModalCreate from "../ModalCreate";
import { testSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";

const EditTestForm = () => {
    const { tests } = useSelector((state) => state);

    const router = useRouter();
    const { id, testId } = router.query;
    // console.log(router.pathname);

    const dispatch = useDispatch();

    const showTestModal = () => {
        dispatch(allActions.modalActions.visibleTestYes());
    };

    let defaultValues;
    if (testId !== undefined) {
        const { testTitle, testCode, classNo, testTime } = tests[testId];
        defaultValues = { testTitle, testCode, classNo, testTime };
    }

    const {
        handleSubmit,
        formState: { errors, isDirty },
        control,
    } = useForm({
        mode: "onBlur",
        defaultValues: { ...defaultValues },
        resolver: yupResolver(testSchema),
    });

    const onEditSubmit = async (data) => {
        dispatch(allActions.testActions.editTest(id, testId, data));
    };

    const onHandleCancel = () => {
        // console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleTestNo());
    };

    return (
        <>
            <Tooltip
                placement="left"
                title="Edit Test"
                color="#108ee7"
                overlayClassName="tooltip-mobile-display-none"
            >
                <PlusCircleFilled
                    onClick={showTestModal}
                    // style={{ fontSize: 20, color: "#20f540" }}
                    className="hover-icon-edit-test test-submit-big"
                />
            </Tooltip>
            <ModalCreate
                onOk={handleSubmit(onEditSubmit)}
                isDirty={isDirty}
                title="Edit Test"
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
                <TestFormGroup control={control} errors={errors} path="edit" />
            </ModalCreate>
        </>
    );
};

export default EditTestForm;
