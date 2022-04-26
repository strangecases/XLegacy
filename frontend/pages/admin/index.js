import { useSelector } from "react-redux";
import AdminRoute from "../../components/routes/AdminRoute";

const UserIndex = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <AdminRoute>
            <h1 className="jumbotron text-center bg-primary">
                <pre>{JSON.stringify(user, null, 4)}</pre>
            </h1>
        </AdminRoute>
    );
};

export default UserIndex;
