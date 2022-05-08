import { Col, Form, Row } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomLayout from "../../components/nav/CustomLayout";
import { schoolSchema } from "../../yupUtil";
import SchoolForm from "../../components/schools/SchoolForm";

const SchoolNewForm = () => {
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

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <Row justify="center">
                <Col xs={15} lg={13} span={13}>
                    <Form onFinish={handleSubmit(onSubmit)} autoComplete="off">
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
    );
};

SchoolNewForm.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default SchoolNewForm;
