import {useEffect , useState} from "react";
import "./_categoryBar.scss"
import {useAppDispatch} from "../../redux/store.ts";
import {getVideosByKeyword , getyoutubeVideos} from "../../redux/videoSlice.ts";

const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Bengali Songs',
    'Coding',
    'Cricket',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Poor Coder',
    'Shwetabh',
]

export function CategoryBar(){

    const[activeElement, setActiveElement] = useState('All')
    const dispatch = useAppDispatch()



    function HandleClick(value : string){
        setActiveElement(value)
        sessionStorage.setItem("keyword" , JSON.stringify(value))
        if (value === 'All') {
            dispatch(getyoutubeVideos())
        }
        else {
            dispatch(getVideosByKeyword({ keyword: value }))
        }
        console.log(value)
    }


    // useEffect(()=>{
    //     setActiveElement(sessionStorage.getItem("keyword"))
    // },[])

    return(
        <div className="categoryBar">
            {keywords.map((value, i)=>(
                <span
                    className={ `p-2 rounded-pill me-3 ${activeElement === value? "active" : ""}` }
                    key={i}
                    onClick={()=>HandleClick(value)}
               >
                    {value}
                </span>
            ))}
        </div>
    )
}