import { Col, Form, Row } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CustomLayout from "../../../components/nav/CustomLayout";
import { schoolSchema } from "../../../yupUtil";
import SchoolForm from "../../../components/schools/SchoolForm";
import allActions from "../../../store/actions";
import AdminIsSchoolAdmin from "../../../components/routes/AdminIsSchoolAdmin";

const SchoolEditForm = () => {
    const { schools } = useSelector((state) => state);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

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
        if (id) {
            dispatch(allActions.schoolActions.fetchSchool(id));
        }
    }, [id]);

    useEffect(() => {
        if (schools[id]) {
            setValue("schoolName", schools[id].schoolName);
            setValue("schoolCode", schools[id].schoolCode);
            setValue("schoolPhNo", schools[id].schoolPhNo);
            setValue("schoolAddress", schools[id].schoolAddress);

            schools[id].classes.forEach((item, ind) => {
                // append();
                remove(ind + 1);
                setValue(`classes.${ind}.classNo`, item.classNo);
                item.groups.forEach((group, i) => {
                    setValue(`classes.${ind}.groups.${i}.group`, group.group);
                });
            });
        }
    }, [schools, id]);

    const onSubmit = async (data) => {
        dispatch(allActions.schoolActions.editSchool(id, data));
        router.push(`/schools/`);
    };

    return (
        <AdminIsSchoolAdmin>
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
                            path="edit"
                        />
                    </Form>
                </Col>
            </Row>
        </AdminIsSchoolAdmin>
    );
};

SchoolEditForm.getLayout = (page) => (
    <CustomLayout type="inside">{page}</CustomLayout>
);

export default SchoolEditForm;
