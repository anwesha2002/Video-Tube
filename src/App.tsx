import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Header} from "./Component/Header/header.tsx";
import {Sidebar} from "./Component/Sidebar/sidebar.tsx";
import {Container} from "react-bootstrap";
import {HomeScreen} from "./Screen/Homescreen.tsx";
import "./_app.scss"
import {Home} from "./Page/Home.tsx";
import {Navigate , Route , Router , Routes , useNavigate} from "react-router-dom";
import {LoginScreen} from "./Screen/LoginScreen/LoginScreen.tsx";
import {PrivateRoute} from "./Component/PrivateRoute/privateRoute.tsx";
import {WatchScreen} from "./Screen/WatchScreen/WatchScreen.tsx";

function App() {
  const [count, setCount] = useState(0)
    const navigate= useNavigate()

  return (
    <Routes>
        <Route path="/" element={
            <PrivateRoute>
                <Home>
                    <HomeScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
        <Route path="/auth" element={<LoginScreen/>}></Route>
        <Route path="/watch/:id" element={<WatchScreen/>}></Route>
        <Route path="*" element={
            <PrivateRoute>
                <Home>
                    <HomeScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
      {/*<Home/>*/}
    </Routes>
  )
}

export default App
