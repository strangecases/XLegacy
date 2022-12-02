import Spinner from "../Spinner";
import useNotLoggedIn from "../../hooks/use-notLoggedin";

const IsNotLoggedIn = ({ children }) => {
    const { ok } = useNotLoggedIn({
        link: "/api/current-admin",
        routeLink: "/admin",
    });

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default IsNotLoggedIn;
