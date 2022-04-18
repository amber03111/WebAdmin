import './App.css';
import React from 'react';
import { Routes,Route} from 'react-router-dom';
//import { useLocation, Navigate} from 'react-router-dom';
import Teacher from'./pages/teacher/index';
import Administrators from'./pages/administrators/index'
import Frontpage from './pages/frontpage/index';


class App extends React.Component {
    
    render(){
        
        return( 
            <Routes>
            
            <Route path="/administrator/*" element={< Administrators  />} />
            <Route path="/teacher/*" element={<Teacher/>} />
            <Route exact path="/*" element={ <Frontpage/>}/>
            
       </Routes>
        )
    }
}

//function RequireAuth({children}: {children: JSX.Element}) {
 //   let location = useLocation();
    
 //   return <Navigate to="/" state={{ from: location}} replace />
//}

export default App;

