import React from 'react'

import { Route, Routes} from "react-router-dom";
import Font from "../frontpage/font/font.js"
import Enroll from "../frontpage/enroll/index.js"
import Forget from "../frontpage/forget/index.js"
import Background from "./bac3.jpg"
var backgroundstyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  position: "fixed",
};


class Frontpage extends React.Component {
  

  render() {
    
    return (
      
        <div style={backgroundstyle}> 
               <Routes >
                    <Route path="" element={<Font/>}/>
                    <Route path="/teacher/*" element={<Font/>} />
                    <Route path="/enroll" element={<Enroll />} />
                    <Route path = "/forget" element={<Forget/>}/>
               </Routes>
            
       
        </div>


    )

  }

};
export default Frontpage;