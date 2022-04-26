import { Form } from "antd";
import Link from "next/link";
import FormItem from "../../FormItem";

const SectionFormGroup = ({ control, errors, id }) => {
    return (
        <div className="container col-md-10 offset-md-1 pb-5">
            <Form>
                <FormItem
                    control={control}
                    errors={errors}
                    name="subject"
                    placeholder="Enter subject"
                    type="text"
                />
                <FormItem
                    control={control}
                    errors={errors}
                    name="sectionNo"
                    placeholder="Enter section number"
                    type="number"
                />
                <FormItem
                    control={control}
                    errors={errors}
                    name="sectionDescription"
                    placeholder="Enter section description"
                    type="text"
                />
            </Form>

            <p className="text-center">
                <Link href={`/tests/${id}`}>
                    <a>Back to test</a>
                </Link>
            </p>
        </div>
    );
};

export default SectionFormGroup;
