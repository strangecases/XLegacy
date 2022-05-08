import { Col, Form, Row } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import CustomLayout from "../../components/nav/CustomLayout";
import { schoolSchema } from "../../yupUtil";
import SchoolForm from "../../components/schools/SchoolForm";

const SchoolEditForm = () => {
    const {
        handleSubmit,
        formState: { isDirty, isSubmitting, errors },
        control,
        setValue,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schoolSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "classes",
    });

    useEffect(() => {
        const school = {
            schoolName: "ZPHS Kolthur",
            schoolCode: "fdgf",
            classes: [
                { classNo: 8, groups: [{ group: "a" }, { group: "b" }] },
                {
                    classNo: 9,
                    groups: [{ group: "a" }, { group: "b" }, { group: "c" }],
                },
            ],
        };
        setValue("schoolName", school.schoolName);
        setValue("schoolCode", school.schoolCode);
        append();
        school.classes.forEach((item, ind) => {
            remove(ind + 1);
            setValue(`classes.${ind}.classNo`, item.classNo);
            item.groups.forEach((group, i) => {
                setValue(`classes.${ind}.groups.${i}.group`, group.group);
            });
        });
    }, []);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <Row justify="center">
                <Col span={13}>
                    <Form onFinish={handleSubmit(onSubmit)} autoComplete="off">
                        <SchoolForm
                            control={control}
                            errors={errors}
                            append={append}
                            remove={remove}
                            fields={fields}
                            isDirty={isDirty}
                            isSubmitting={isSubmitting}
                        />
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

SchoolEditForm.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default SchoolEditForm;
