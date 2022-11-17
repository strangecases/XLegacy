import { useEffect } from "react";
import { useRouter } from "next/router";
// import PrincipleRoute from "../components/routes/PrincipleRoute";

const PrincipleExample = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("404");
    }, [router]);

    return (
        // <PrincipleRoute>
        <div>Hi</div>
        // </PrincipleRoute>
    );
};

export default PrincipleExample;
