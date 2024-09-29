import {lazy , Suspense , useState} from 'react'
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
import {SearchScreen} from "./Screen/SearchScreen/SearchScreen.tsx";
import {Subscription} from "./Screen/Subscription/Subscription.tsx";
import {ChannelScreen} from "./Screen/channelScreen/channelScreen.tsx";

function App() {
  const [count, setCount] = useState(0)
    const navigate= useNavigate()


    // const { WatchScreen } = React.lazy(() => import('./Screen/WatchScreen/WatchScreen.tsx'));

  return (
      <Suspense fallback={ "Lazy loading pages ..." }>
    <Routes>
        <Route path="/" element={
            <PrivateRoute>
                <Home>
                    <HomeScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
        <Route path="/auth" element={<LoginScreen/>}></Route>
        <Route path="/watch/:id" element={
            <PrivateRoute>
                <Home>
                    <WatchScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
        <Route path="/search/:query" element={
            <PrivateRoute>
                <Home>
                    <SearchScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
        <Route path="/feed/subscription" element={
            <PrivateRoute>
                <Home>
                    <Subscription/>
                </Home>
            </PrivateRoute>
        }></Route>
        <Route path="/feed/:channelId" element={
            <PrivateRoute>
                <Home>
                    <ChannelScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
        <Route path="*" element={
            <PrivateRoute>
                <Home>
                    <HomeScreen/>
                </Home>
            </PrivateRoute>
        }></Route>
      {/*<Home/>*/}
    </Routes>
      </Suspense>
  )
}

export default App
