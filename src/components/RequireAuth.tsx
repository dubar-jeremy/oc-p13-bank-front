import {Navigate, useLocation} from "react-router-dom";
import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";

const RequireAuth = ({children}: { children: ReactElement }) => {
    const auth = useSelector<RootState, boolean>((state) => state.authentication.isAuthenticated)
    const location = useLocation();

    if (!auth) {
       return <Navigate to="/" state={{from: location}} replace/>;
     }

    return children;
}

export default RequireAuth
