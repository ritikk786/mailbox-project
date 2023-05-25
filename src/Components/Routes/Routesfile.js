import React, { Fragment } from "react";
import Setting from "../Setting/Setting";
import Inbox from "../Inbox/Inbox";
import { Route, Routes } from 'react-router-dom';
const Routesfile = () => {
    return (
        <div>
                
            <Routes>
                <Route path="/inbox" element={<Inbox />}/>
                <Route path="/welcome/setting" element={<Setting />}/>

                {/* <Route path='*' element={<Inbox />} /> */}
            </Routes>
           
        </div>

    )
}
export default Routesfile;