import {FaBars , FaPortrait} from "react-icons/fa";
import {Button , Col , Row} from "react-bootstrap";
import {AiOutlineSearch} from "react-icons/ai";
import {MdApps , MdNotifications} from "react-icons/md";
import ytLogo from "../../public/Youtube_logo.png"
import "./_header.scss"
import {useEffect , useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";

export function Header({handleToggleSidebar}){
    const [input, setInput] = useState("")
    const navigate= useNavigate()

    // const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)


    function handleSubmit(e){
        e.preventDefault()
        setInput(input)
        if(input.trim() !== "")  navigate(`search/${input}`)
    }

    return(
        <div className=" header d-flex justify-content-between align-items-center">
            <FaBars className="header_bar" size={28} onClick={()=>handleToggleSidebar()}/>
            {/*<Row>*/}
                <Col>
                    <img
                        src={ytLogo}
                        className="header__logo object-fit-contain"
                    />
                </Col>
                <Col lg={6} sm={10}>
                    <form className="d-flex justify-content-center  m-1 rounded-5 " onSubmit={handleSubmit}>
                        <input type="search" placeholder="Search" value={input} onChange={(e)=>setInput(e.target.value)}/>
                        <div className="rounded-end-5">
                            <button type="submit" className="d-flex align-items-center px-4 py-1">
                                <AiOutlineSearch size={28}/>
                            </button>
                        </div>
                    </form>
                </Col>
                <Col className="header_icon d-flex justify-content-end">
                    <div className="header_icon_div w-50 d-flex justify-content-around align-items-center">
                        <MdNotifications size={28}/>
                        <MdApps size={28}/>
                        <img
                            src={user.profileURL}
                            className=" object-fit-cover d-block rounded-circle"
                        />
                    </div>
                </Col>
            {/*</Row>*/}

        </div>
    )
}