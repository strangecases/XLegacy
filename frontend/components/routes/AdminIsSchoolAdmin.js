import { useRouter } from "next/router";
import Spinner from "../Spinner";
import useAuthorization from "../../hooks/use-authorization";

const AdminIsSchoolAdmin = ({ children }) => {
    const router = useRouter();
    const { id } = router.query;

    const { ok } = useAuthorization({
        link: id && `/api/admin-is-school-admin/${id}`,
        routeLink: "/admin",
        messageShow: "you can not visit that page.",
    });

    return <div>{ok ? <> {children} </> : <Spinner />}</div>;
};

export default AdminIsSchoolAdmin;
