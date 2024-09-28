import {Header} from "../Component/Header/header.tsx";
import {Sidebar} from "../Component/Sidebar/sidebar.tsx";
import {Container} from "react-bootstrap";
import {HomeScreen} from "../Screen/Homescreen.tsx";
import {useEffect , useState} from "react";
import {LoginScreen} from "../Screen/LoginScreen/LoginScreen.tsx";
import {useAppSelector} from "../redux/store.ts";
import {useNavigate} from "react-router-dom";

export function Home({children}){

    const [showSidebar, toggleSidebar] = useState(false)
    const { loading,accessToken, user, error} = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    const handleToggleSidebar = () => {
        toggleSidebar(value => !value)
    }

    return(
        <>
            <Header handleToggleSidebar={handleToggleSidebar}/>
            <div className="app_container ">
                <Sidebar showSidebar={showSidebar}/>
                <Container fluid className=" w-100 m-0">
                    {/*<HomeScreen/>*/}
                    {children}
                </Container>
            </div>
            {/*<LoginScreen/>*/}
        </>
    )
}