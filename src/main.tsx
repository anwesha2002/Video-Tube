import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import "bootstrap/dist/css/bootstrap.css"
import 'react-loading-skeleton/dist/skeleton.css'
import "./_base.scss"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

createRoot ( document.getElementById ( 'root' )! ).render (
    <Provider store={ store }>
        <BrowserRouter>
            {/*<StrictMode>*/}
                <App/>
            {/*</StrictMode>*/}
        </BrowserRouter>
    </Provider>
)
