import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'



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
         <div className="sm:w-[50%] w-full border border-blue-400 mt-60 min-h-[40vh] rounded-md m-auto">
         <h1 className="m-auto text-xl text-center">CHOOSE OPTION</h1>
         <div className="flex flex-col mt-20 items-center w-11/12">
          {
            userData &&  userData.role === "teacher" ? (
                <div>
 <div className="flex w-10/12 gap-4 cursor-pointer">

<button className="rounded-full  text-3xl h-14 w-1/12 text-center bg-blue-700 text-white font-bold">2</button>
 <Link to="/fault">
 <div className='flex border md:gap-[100px] hover:bg-blue-100  h-12 rounded-md m-2 indent-4 justify-between items-center w-full border-blue-700'>
     <p className="m-auto">Sign A Discipline Issue</p>
     <MdOutlineKeyboardArrowRight className="text-4xl text-blue-600"/>
 </div></Link></div>
                </div>
            ) : (
                <div>
  <div className="flex gap-4 w-10/12 cursor-pointer">
            <button className="rounded-full  text-3xl h-14 w-1/12 text-center bg-blue-700 text-white font-bold">1</button>
            <Link to="/permission">
            <div className='flex border  hover:bg-blue-100 gap-[100px]  h-12 rounded-md m-2 indent-4 justify-between items-center w-1/1 border-blue-700'>
                <p className="m-auto">Sign A Permission </p>
                <MdOutlineKeyboardArrowRight className="text-4xl text-blue-600"/>
            </div></Link>
            </div>
           <div className="flex w-10/12 gap-4 cursor-pointer">

           <button className="rounded-full  text-3xl h-14 w-1/12 text-center bg-blue-700 text-white font-bold">2</button>
            <Link to="/fault">
            <div className='flex border md:gap-[100px] hover:bg-blue-100  h-12 rounded-md m-2 indent-4 justify-between items-center w-full border-blue-700'>
                <p className="m-auto">Sign A Discipline Issue</p>
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