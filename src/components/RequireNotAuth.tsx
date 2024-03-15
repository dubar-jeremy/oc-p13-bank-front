import {Navigate, useLocation } from "react-router-dom";
import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";

const RequireNotAuth = ({children}: { children: ReactElement }) => {
    const auth = useSelector<RootState, boolean>((state) => state.authentication.isAuthenticated)

    const location = useLocation();

    if (auth) {
        return <Navigate to={location.state?.from || "/"} state={{from: location}} replace/>;
    }

    return children;
};

export default RequireNotAuth;
