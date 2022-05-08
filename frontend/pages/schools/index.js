import { Button } from "antd";
import Link from "next/link";
import CustomLayout from "../../components/nav/CustomLayout";

const Schools = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                <Link href="/schools/new" passHref>
                    <Button type="danger">School Form</Button>
                </Link>
            </h1>
        </div>
    );
};

Schools.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default Schools;
