import { useEffect, useRef } from "react";

const useGrew = () => {
    const grew = useRef(1);

    useEffect(() => {
        grew.current += 1;
    });

    return [grew.current];
};

export default useGrew;
