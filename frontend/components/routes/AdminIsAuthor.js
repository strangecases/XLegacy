import { useRouter } from "next/router";
import Spinner from "../Spinner";
import useAuthorization from "../../hooks/use-authorization";

const AdminIsAuthor = ({ children }) => {
    const router = useRouter();
    const { testId } = router.query;

    const { ok } = useAuthorization({
        link: testId && `/api/admin-is-author/${testId}`,
        routeLink: "/admin",
        messageShow: "you can not visit that page.",
    });

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminIsAuthor;
