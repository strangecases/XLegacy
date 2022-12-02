import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
import axiosFetch from "../axiosFetch";

const useAuthorization = ({ link, routeLink, messageShow }) => {
    const [ok, setOk] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axiosFetch.get(link);
                if (data.ok) {
                    setOk(true);
                }
            } catch (err) {
                setOk(false);
                if (messageShow) {
                    message.destroy();
                    message.error(messageShow, 2);
                }
                if (routeLink) router.push(routeLink);
            }
        };
        if (link) fetchAdmin();
    }, [router, link, messageShow, routeLink]);

    return { ok };
};

export default useAuthorization;
