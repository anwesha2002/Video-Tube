import {ReactNode} from "react";
import {useAppSelector} from "../../redux/store.ts";
import {Navigate} from "react-router-dom";

interface privateRouteProps {
    children : ReactNode
}

export function PrivateRoute({children} : privateRouteProps){

    const { accessToken } = useAppSelector((state) => state.auth)

    return accessToken ? <>{children}</> : <Navigate to="/auth"/>
}