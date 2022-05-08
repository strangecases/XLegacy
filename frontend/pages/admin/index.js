import { useSelector } from "react-redux";
import CustomLayout from "../../components/nav/CustomLayout";
import AdminRoute from "../../components/routes/AdminRoute";

const AdminIndex = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <AdminRoute>
            <h1 className="jumbotron text-center bg-primary">
                <pre>{JSON.stringify(user, null, 4)}</pre>
            </h1>
        </AdminRoute>
    );
};

AdminIndex.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default AdminIndex;
