import { Col, Form, Row } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import CustomLayout from "../../components/nav/CustomLayout";
import { schoolSchema } from "../../yupUtil";
import SchoolForm from "../../components/schools/SchoolForm";
import allActions from "../../store/actions";
import AdminRoute from "../../components/routes/AdminRoute";

const SchoolNewForm = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const {
        handleSubmit,
        formState: { isDirty, isSubmitting, errors },
        control,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schoolSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "classes",
    });

    const onSubmit = async (data) => {
        dispatch(allActions.schoolActions.createSchool(data));
        router.push(`/schools/`);
    };

    return (
        <AdminRoute>
            <div id="scroll">
                <Row justify="center">
                    <Col xs={15} lg={13} span={13}>
                        <Form
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                        >
                            <SchoolForm
                                control={control}
                                errors={errors}
                                append={append}
                                fields={fields}
                                remove={remove}
                                isDirty={isDirty}
                                isSubmitting={isSubmitting}
                            />
                        </Form>
                    </Col>
                </Row>
            </div>
        </AdminRoute>
    );
};

SchoolNewForm.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default SchoolNewForm;
