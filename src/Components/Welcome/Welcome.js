import React, { useState } from "react";
import Classes from './Welcome.module.css'
import Profile from "../Profile/Profile";
import Routesfile from '../Routes/Routesfile'
import Inbox from "../Inbox/Inbox";
import Setting from "../Setting/Setting";
import { Outlet, Route, Routes } from 'react-router-dom';
import Compose from "../Compose/Compose";
import Sentbox from "../Sentbox/Sentbox";
import ViewMail from "../Inbox/ViewMail";
import ViewSentmail from "../Sentbox/ViewSentmail";
import NavModal from "./NavModal";

const Welcome = () => {
    const [nav, setNav ]= useState(false);

    const shownav = ()=>{
        setNav((prevnav)=>!prevnav)
        console.log('hello')
    }

    return (
<>
            <div className={Classes.center}>
                
                <label htmlFor="check" onClick={shownav}>
                <i className="fa fa-bars"></i>
                </label>
                
               <h3 > Mail Box </h3>
            </div>
            {nav && <NavModal onClick={shownav}/>}
        <div className={Classes.parent}>
            <div className={Classes.div1}><Profile /></div>
            
            <div className={Classes.div2}>
                <Routes>
                    <Route index element={<Compose />} />
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="inbox/:id" element={<ViewMail />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="compose" element={<Compose />} />
                    <Route path="sentbox" element={<Sentbox />} />
                    <Route path="sentbox/:id" element={<ViewSentmail />} />

                    {/* <Route path='*' element={<Inbox />} /> */}
                </Routes>
                <Outlet />
            </div>
        </div>
        </>
        )
}
export default Welcome;