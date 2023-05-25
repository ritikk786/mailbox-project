import React from "react";
import Classes from './Welcome.module.css'
import Profile from "../Profile/Profile";
import Routesfile from '../Routes/Routesfile'
import Inbox from "../Inbox/Inbox";
import Setting from "../Setting/Setting";
import { Outlet, Route, Routes } from 'react-router-dom';
import Compose from "../Compose/Compose";

const Welcome = ()=>{
    return<div className={Classes.parent}>
        <div className={Classes.div1}><Profile/></div>
        <div className={Classes.div2}>
        <Routes>
                <Route index element={<Compose/>}/>
                <Route path="inbox" element={<Inbox />}/>
                <Route path="setting" element={<Setting />}/>
                <Route path="compose" element={<Compose />}/>
                {/* <Route path='*' element={<Inbox />} /> */}
            </Routes>
    <Outlet/>
             </div>
    </div>
}
export default Welcome;