import { Form } from "antd";
import Link from "next/link";
import FormItem from "../../FormItem";

const TestFormGroup = ({ control, errors }) => {
    return (
        <div className="container col-md-10 offset-md-1">
            <Form id="myForm">
                <FormItem
                    control={control}
                    errors={errors}
                    name="testTitle"
                    placeholder="Enter test title"
                    type="text"
                />
                <FormItem
                    control={control}
                    errors={errors}
                    name="testTime"
                    placeholder="Enter test time"
                    type="number"
                />
                <FormItem
                    control={control}
                    errors={errors}
                    name="classNo"
                    placeholder="Enter class number"
                    type="number"
                />
                <FormItem
                    control={control}
                    errors={errors}
                    name="testCode"
                    placeholder="Enter test code"
                    type="text"
                />
            </Form>
            <p className="text-center">
                Go back to
                <Link href="/admin">
                    <a> Dashboard</a>
                </Link>
            </p>
        </div>
    );
};

export default TestFormGroup;
