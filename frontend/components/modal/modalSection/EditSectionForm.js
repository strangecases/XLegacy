import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useEffect } from "react";
import ModalCreate from "../ModalCreate";
import { sectionSchema } from "../../../yupUtil";
import allActions from "../../../store/actions";
import SectionFormGroup from "./SectionFormGroup";

const EditSectionForm = ({ section }) => {
    const router = useRouter();
    const { id, testId } = router.query;

    // let sectionData;
    // if (section) {
    //     const { sectionDescription, sectionNo, subject } = section;
    //     sectionData = { sectionDescription, sectionNo, subject };
    // }

    const dispatch = useDispatch();

    const showSectionModal = () => {
        dispatch(allActions.modalActions.visibleSectionYes());
    };

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
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
    }, [section, setValue]);

    const onSubmit = async (data) => {
        dispatch(allActions.testActions.editSectionOnTest(id, testId, data));
    };

    const onHandleCancel = () => {
        // console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleSectionNo());
    };

    return (
        <>
            <Button style={{ width: "100%" }} onClick={showSectionModal}>
                Edit Section
            </Button>
            <ModalCreate
                onOk={handleSubmit(onSubmit)}
                handleCancel={onHandleCancel}
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
