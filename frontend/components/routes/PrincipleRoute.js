import Spinner from "../Spinner";
import useAuthorization from "../../hooks/use-authorization";

const PrincipleRoute = ({ children }) => {
    const { ok } = useAuthorization({
        link: "/api/principle/current-principle",
        routeLink: "/principle-login",
        messageShow: "If u are principle, login to visit this page",
    });

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default PrincipleRoute;
