import AdminIsSchoolAdmin from "../../../../components/routes/AdminIsSchoolAdmin";
import AdminCustomLayout from "../../../../components/nav/adminCustom/AdminCustomLayout";
import ShowTest from "../../../../components/adminUtil/ShowTests";

const TestId = () => {
    return (
        <AdminIsSchoolAdmin>
            <ShowTest type="admin" />
        </AdminIsSchoolAdmin>
    );
};

TestId.getLayout = (page) => (
    <AdminCustomLayout type="inside">{page}</AdminCustomLayout>
);

export default TestId;
