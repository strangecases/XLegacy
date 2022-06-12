import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useEffect } from "react";
import ModalCreate from "../ModalCreate";
import { EDIT_TEST } from "../../../store/types";
import { sectionSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";
import SectionFormGroup from "./SectionFormGroup";

const EditSectionForm = ({ section }) => {
    const router = useRouter();
    const { id, testId } = router.query;
    console.log(id, testId);

    // let sectionData;
    // if (section) {
    //     const { sectionDescription, sectionNo, subject } = section;
    //     sectionData = { sectionDescription, sectionNo, subject };
    // }

    const { selectedSectionId } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const showSectionModal = () => {
        dispatch(allActions.modalActions.visibleSectionYes());
    };

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
        setValue,
    } = useForm({
        mode: "onBlur",
        // defaultValues: { ...sectionData },
        resolver: yupResolver(sectionSchema),
    });

    useEffect(() => {
        if (section) {
            setValue("subject", section.subject);
            setValue("sectionNo", section.sectionNo);
            setValue("sectionDescription", section.sectionDescription);
        }
    }, [section]);

    const onSubmit = async (data) => {
        const res = await axios.patch(
            `/api/tests/${testId}/sections/${selectedSectionId}`,
            data
        );
        console.log(res.data.test);
        dispatch(allActions.modalActions.visibleSectionNo());
        router.push(`/schools/${id}/tests/${testId}/sections`);
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleSectionNo());
    };

    return (
        <>
            <Button onClick={showSectionModal}>Edit Section</Button>
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

                <SectionFormGroup control={control} errors={errors} />
            </ModalCreate>
        </>
    );
};

// Section.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default EditSectionForm;
