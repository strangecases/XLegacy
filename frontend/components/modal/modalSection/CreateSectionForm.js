import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Tooltip } from "antd";
import ModalCreate from "../ModalCreate";
import { EDIT_TEST } from "../../../store/types";
import { sectionSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";
import SectionFormGroup from "./SectionFormGroup";

const CreateSectionForm = ({ length }) => {
    const router = useRouter();
    const { id, testId } = router.query;

    const { tests } = useSelector((state) => state);

    const dispatch = useDispatch();

    const showSectionModal = () => {
        dispatch(allActions.modalActions.visibleSectionYes());
    };

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
        setValue,
        reset,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(sectionSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        const res = await axios.post(`/api/tests/${testId}/sections`, data);
        console.log(res.data.test);
        dispatch({ type: EDIT_TEST, payload: res.data.test });
        dispatch(allActions.modalActions.visibleSectionNo());
        reset({ subject: "", sectionDescription: "" });
        router.push(`/schools/${id}/tests/${testId}`);
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleSectionNo());
        reset({ subject: "", sectionDescription: "" });
    };

    return (
        <>
            <Tooltip
                title={length >= 4 ? "Limit of 4 sections reached" : ""}
                placement="bottomLeft"
                color="#05b523"
            >
                <Button
                    type="primary"
                    onClick={showSectionModal}
                    disabled={length >= 4}
                >
                    Add Section
                </Button>
            </Tooltip>
            <ModalCreate
                onOk={handleSubmit(onSubmit)}
                handleCancel={onHandleCancel}
                isSubmitting={isSubmitting}
                isDirty={isDirty}
                title="Create Section"
                path="section"
            >
                {/* <div className="container col-md-10 offset-md-1 pb-5">
                    <Form>
                        <FormItem
                            control={control}
                            errors={errors}
                            name="subject"
                            placeholder="Enter admin code"
                            type="text"
                        />
                        <FormItem
                            control={control}
                            errors={errors}
                            name="sectionNo"
                            placeholder="Enter admin code"
                            type="number"
                        />
                        <FormItem
                            control={control}
                            errors={errors}
                            name="sectionDescription"
                            placeholder="Enter admin code"
                            type="text"
                        />
                    </Form>

                    <p className="text-center">
                        <Link href={`/tests/${id}`}>
                            <a>Back to test</a>
                        </Link>
                    </p>
                </div> */}
                {testId && (
                    <SectionFormGroup
                        control={control}
                        errors={errors}
                        secNum={tests[testId].sectionData.length + 1}
                        setValue={setValue}
                    />
                )}
            </ModalCreate>
        </>
    );
};

// Section.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default CreateSectionForm;
