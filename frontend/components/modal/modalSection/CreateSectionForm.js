import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "antd";
import ModalCreate from "../ModalCreate";
import { EDIT_TEST } from "../../../store/types";
import { sectionSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";
import SectionFormGroup from "./SectionFormGroup";

const CreateSectionForm = () => {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();

    const showSectionModal = () => {
        dispatch(allActions.customActions.visibleSectionYes());
    };

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(sectionSchema),
    });

    const onSubmit = async (data) => {
        const res = await axios.post(`/api/prepare/tests/${id}/sections`, data);
        console.log(res.data.test);
        dispatch({ type: EDIT_TEST, payload: res.data.test });
        dispatch(allActions.customActions.visibleSectionNo());
        router.push(`/tests/${id}`);
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.customActions.visibleSectionNo());
    };

    return (
        <>
            <Button type="primary" onClick={showSectionModal}>
                Section
            </Button>
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
                {id && (
                    <SectionFormGroup
                        control={control}
                        errors={errors}
                        id={id}
                    />
                )}
            </ModalCreate>
        </>
    );
};

// Section.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default CreateSectionForm;
