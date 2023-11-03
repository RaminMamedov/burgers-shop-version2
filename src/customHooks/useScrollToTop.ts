import {useEffect} from "react";
import {Status} from "../redux/burgersSlice/burgerTypes";

export const useScrollToTop = (status: Status) => {
    useEffect(() => {
        if (status === Status.SUCCESS) {
            window.scrollTo(0, 0);
        }
    }, [status]);
};