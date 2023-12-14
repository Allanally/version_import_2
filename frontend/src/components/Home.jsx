import React from 'react';
import logo from './logo.0cfaa4df.png';
import { Link, Routes, Route }from 'react-router-dom';
import  Login from "./Login";

import Footer from "./Footer";

const Home = () => {
    return ( 
        <div className='flex min-h-screen' >  
        <div className='flex flex-col w-full h-screen  justify-center items-center'>
            <img src={logo} alt="" className='min-w-2/12 mr-auto mb-10 ml-auto min-h-2/6' />
                <p className='text-2xl text-center m-2 -mt-2'>  Signing permissions has never been easier as today  </p>

                <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
                
                    <Link to="/login"><button className='bg-blue-500 h-20 w-60 text-white text-xl rounded-md mt-8 font-bold'>Get Started</button></Link>
                </div>

             

        </div>
     );
}
 
export default Home;