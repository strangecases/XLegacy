import { useSelector } from "react-redux";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <UserRoute>
            <h1 className="jumbotron text-center bg-primary">
                <pre>{JSON.stringify(user, null, 4)}</pre>
            </h1>
        </UserRoute>
    );
};

export default UserIndex;
