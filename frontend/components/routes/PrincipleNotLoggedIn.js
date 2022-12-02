import Spinner from "../Spinner";
import useNotLoggedin from "../../hooks/use-notLoggedin";

const PrincipleNotLoggedIn = ({ children }) => {
    const { ok } = useNotLoggedin({
        link: "/api/principle/current-principle",
        routeLink: "/principle-example",
    });

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default PrincipleNotLoggedIn;
