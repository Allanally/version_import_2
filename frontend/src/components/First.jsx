import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import { VscDebugContinue } from "react-icons/vsc";


const First = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
     }
    }, []);
   
    return ( 
        <div>
         <Navbar />
         <div className="sm:w-[50%] w-11/12 border border-blue-400 mt-60 min-h-[50vh] rounded-md m-auto">
         <h1 className="m-auto text-2xl text-center mt-6">CHOOSE OPTION</h1>
         <div className="flex flex-col mt-14 items-center w-11/12">
          {
            userData &&  userData.role === "teacher" ? (
                <div>
 <div className="flex w-10/12 gap-4 cursor-pointer">

<button className="rounded-full  text-3xl h-14 w-1/12 text-center bg-blue-700 text-white font-bold">2</button>
 <Link to="/fault">
 <div className='flex border md:gap-[100px] hover:bg-blue-100  h-12 rounded-md m-2 justify-between items-center w-full border-blue-700'>
     <p className="m-auto">Sign A Discipline Issue</p>
     <MdOutlineKeyboardArrowRight className="text-4xl text-blue-600"/>
 </div></Link></div>
                </div>
            ) : (
                <div>
            <div className="flex gap-4 w-11/12 cursor-pointer">
            <button className="rounded-full border mb-2"><VscDebugContinue className="w-12 h-9 text-blue-800" /></button>
            <Link to="/permission">
            <div className='flex  justify-between border w-full gap-2 hover:bg-blue-100   h-12 rounded-md mb-2 items-center border-blue-700'>
                <p className="ml-2 md:w-[200px]">Sign A Permission </p>
                <MdOutlineKeyboardArrowRight className="text-4xl text-blue-600"/>
            </div></Link>
            </div>
           <div className="flex w-11/12 gap-4 cursor-pointer">

           <button className="rounded-full border"><VscDebugContinue className="w-12 h-9 text-blue-800" /></button>
            <Link to="/fault">
            <div className='flex border hover:bg-blue-100 gap-2  h-12 rounded-md justify-between items-center w-full border-blue-700'>
                <p className="ml-2 md:w-[200px]">Sign A Discipline Issue</p>
                <MdOutlineKeyboardArrowRight className="text-4xl text-blue-600"/>
            </div></Link></div>
                    </div>
            )
          }
          
           </div>
          
         </div>
      
     
    </div> 
  );

      }

export default First;