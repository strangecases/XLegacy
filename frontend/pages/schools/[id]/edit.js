import { BackTop, Col, Form, Row } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import { schoolSchema } from "../../../yupUtil";
import schoolSchema from "../../../schoolYup";
import SchoolForm from "../../../components/schools/SchoolForm";
import allActions from "../../../store/actions";
import AdminIsSchoolAdmin from "../../../components/routes/AdminIsSchoolAdmin";
import schoolStyle from "../../../styles/modules/pageStyles/Schools.module.css";
import AdminCustomLayout from "../../../components/nav/adminCustom/AdminCustomLayout";

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

    // const grew = useRef(0);

    // useEffect(() => {
    //     grew.current += 1;
    // });

    useEffect(() => {
        if (id) {
            dispatch(allActions.schoolActions.fetchSchool(id));
        }
    }, [id, dispatch]);

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
    }, [schools, id, remove, setValue]);

    const onSubmit = async (data) => {
        dispatch(allActions.schoolActions.editSchool({ id, formValues: data }));
    };

    return (
        <AdminIsSchoolAdmin>
            <Row justify="center">
                <Col xs={24} sm={16} lg={13} span={13}>
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
            <BackTop
                className={schoolStyle["edit-school-position-right"]}
                visibilityHeight={800}
                duration={300}
            >
                <ArrowUpOutlined
                    className={schoolStyle["edit-school-back-top"]}
                />
            </BackTop>
            {/* {grew.current} */}
        </AdminIsSchoolAdmin>
    );
};

SchoolEditForm.getLayout = (page) => (
    <AdminCustomLayout type="inside">{page}</AdminCustomLayout>
);

export default SchoolEditForm;
