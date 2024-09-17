import {Nav} from "react-bootstrap";
import {
    MdExitToApp ,
    MdFireplace ,
    MdHistory ,
    MdHome ,
    MdNewspaper ,
    MdOutlinePodcasts ,
    MdPlaylistPlay ,
    MdSubscriptions ,
    MdThumbUp ,
    MdVideoLibrary
} from "react-icons/md";
import "./_sidebar.scss"
import {SiYoutubegaming , SiYoutubeshorts} from "react-icons/si";
import {BsPlayBtn} from "react-icons/bs";
import {LuClock8} from "react-icons/lu";
import {IoIosArrowForward} from "react-icons/io";
import {RiShoppingBag4Line} from "react-icons/ri";
import {PiFilmSlateBold , PiMusicNoteLight} from "react-icons/pi";
import {HiSignal} from "react-icons/hi2";
import {GrTrophy} from "react-icons/gr";
import {GiHanger} from "react-icons/gi";
import {AiOutlineBulb} from "react-icons/ai";
import {useAppDispatch} from "../../redux/store.ts";
import {logout} from "../../redux/authSlice.ts";

export function Sidebar({showSidebar}){

    if (window.scrollY) {
        window.scroll(0, 0); // reset the scroll position to the top left of the document.
    }

    const dispatch = useAppDispatch()

    return(
        <Nav className={`sidebar ${showSidebar ? "open" : " "}`}>
            <div className="mt-4  sm:none">
                <li className="d-flex align-items-center ">
                    <MdHome size={23}/>
                    <span className="ms-3">Home</span>
                </li>
                <li className="d-flex align-items-center">
                    <SiYoutubeshorts size={23}/>
                    <span className="ms-3">Shorts</span>
                </li>
                <li className="d-flex align-items-center">
                    <MdSubscriptions size={23}/>
                    <span className="ms-3">Subscriptions</span>
                </li>

                <hr></hr>

                <li>
                    <span>You</span>
                    <IoIosArrowForward className="ms-2" size={23}/>
                </li>

                <li className="d-flex align-items-center ">
                    <MdVideoLibrary size={23}/>
                    <span className="ms-3">Your channel</span>
                </li>
                <li className="d-flex align-items-center">
                    <MdHistory size={23}/>
                    <span className="ms-3">History</span>
                </li>
                <li className="d-flex align-items-center">
                    <MdPlaylistPlay size={30}/>
                    <span className="ms-2">Playlists</span>
                </li>
                <li className="d-flex align-items-center ">
                    <BsPlayBtn  size={23}/>
                    <span className="ms-3">Your videos</span>
                </li>
                <li className="d-flex align-items-center">
                    <LuClock8  size={23}/>
                    <span className="ms-3">Watch later</span>
                </li>
                <li className="d-flex align-items-center">
                    <MdThumbUp size={23}/>
                    <span className="ms-3">Liked videos</span>
                </li>

                <hr></hr>

                <li>
                    <span>Subscriptions</span>
                </li>

                <hr></hr>

                <li>
                    <span>Explore</span>

                </li>

                <li className="d-flex align-items-center ">
                    <MdFireplace size={23}/>
                    <span className="ms-3">Trending</span>
                </li>
                <li className="d-flex align-items-center">
                    <RiShoppingBag4Line  size={23}/>
                    <span className="ms-3">Shopping</span>
                </li>
                <li className="d-flex align-items-center">
                    <PiMusicNoteLight  size={23}/>
                    <span className="ms-2">Music</span>
                </li>
                <li className="d-flex align-items-center ">
                    <PiFilmSlateBold    size={23}/>
                    <span className="ms-3">Films</span>
                </li>
                <li className="d-flex align-items-center">
                    <HiSignal   size={23}/>
                    <span className="ms-3">Live</span>
                </li>
                <li className="d-flex align-items-center">
                    <SiYoutubegaming  size={23}/>
                    <span className="ms-3">Gaming</span>
                </li>
                <li className="d-flex align-items-center">
                    <MdNewspaper size={23}/>
                    <span className="ms-3">News</span>
                </li>
                <li className="d-flex align-items-center">
                    <GrTrophy  size={23}/>
                    <span className="ms-2">Sport</span>
                </li>
                <li className="d-flex align-items-center ">
                    <AiOutlineBulb   size={23}/>
                    <span className="ms-3">Courses</span>
                </li>
                <li className="d-flex align-items-center">
                    <GiHanger  size={23}/>
                    <span className="ms-3">Fashion & beauty</span>
                </li>
                <li className="d-flex align-items-center">
                    <MdOutlinePodcasts  size={23}/>
                    <span className="ms-3">Podcast</span>
                </li>

                <hr></hr>

                <li onClick={()=>dispatch(logout())} className="d-flex align-items-center">
                    <MdExitToApp  size={23}/>
                    <span className="ms-3">Logout</span>
                </li>



            </div>


        </Nav>
    )
}