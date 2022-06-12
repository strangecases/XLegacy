import { Form, Input, Row, Col } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller } from "react-hook-form";
import FormItem from "../../formitems/FormItem";

const SectionFormGroup = ({
    control,
    errors,
    setValue = () => {},
    secNum = "",
}) => {
    const router = useRouter();
    const { id, testId } = router.query;

    return (
        <Row justify="center">
            <Col span={18}>
                <Form>
                    <FormItem
                        control={control}
                        errors={errors}
                        name="subject"
                        placeholder="Enter subject"
                        type="text"
                    />
                    {/* <FormItem
                    control={control}
                    errors={errors}
                    name="sectionNo"
                    placeholder="Enter section number"
                    type="number"
                /> */}
                    <Form.Item>
                        <Controller
                            value={setValue("sectionNo", secNum)}
                            control={control}
                            name="sectionNo"
                            render={({ field }) => (
                                <Input {...field} readOnly />
                            )}
                        />
                    </Form.Item>
                    <FormItem
                        control={control}
                        errors={errors}
                        name="sectionDescription"
                        placeholder="Enter section description"
                        type="text"
                    />
                </Form>
            </Col>

            {/* <p className="text-center">
                <Link href={`/schools/${id}/tests`}>
                    <a>Back to tests</a>
                </Link>
            </p> */}
        </Row>
    );
};

export default SectionFormGroup;
