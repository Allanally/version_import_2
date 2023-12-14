import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import Footer from "./Footer";
const Fault = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [issuer, setIssuer] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [stream, setStream] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
     
      if (parsedData && parsedData.name) {
        setIssuer(parsedData.name);
      }
     }
    }, []);

   const navigate = useNavigate('');

   const handleSubmit = (e) =>{
      e.preventDefault()
      axios.post('http://localhost:1338/fault', {
        name, date, type, issuer, message, user, stream
      })
      .then(result => {
         console.log(result);
         swal("Successfully signed");
         navigate('/first');
       })
      .catch(err => {
         console.log(err);
         swal("Failed to Sign!!!!");
       });
  }
          

    return ( 
        <div className="fault-container">
            <Navbar />
           <div className="md:w-8/12 w-11/12 mt-36 min-h-fit border-2 border-blue-500 rounded-md m-auto">
            <h1 className="text-3xl text-center font-bold">Discipline Signing Form</h1>
            <br />
            <form onSubmit={handleSubmit} className='w-11/12 m-auto text-md mt-10  flex-col flex'>
               <div className="flex w-full text-md flex-col">
            <label className="font-bold" >Student Names</label>
                <input type="text" className="border-b-2 border-black m-2 focus:border-blue-600 focus:outline-none border-dashed" placeholder="Eg: Ganza Hodari" required value={name} onChange={(e) => setName(e.target.value)}/>
              </div> <div className="flex flex-col">
                <label className="font-bold">Signing Date</label>
                <input type="date" className="border indent-4 m-2 focus:outline-blue-400 rounded-md h-[5vh]" onChange={(e) => setDate(e.target.value)} required />
               </div>
               <div className="flex">
                  <div className="flex flex-col w-6/12">
                  <label className="font-bold" >Case Type</label>
                  <select value={type} className="h-14 text-md md:w-6/12 w-11/12 bg-white border outline-blue-500 rounded-md border" required onChange={(e) => setType(e.target.value)}>
                     <option value="Initiative">Initiative</option>
                     <option value="Advice">Advice</option>
                     <option value="Fault">Fault</option>
                  </select>
                  </div>
                  <div className="flex flex-col w-6/12">
                  <label className="font-bold" >Issuer</label>
                  {userData && (
        <div>
          <p className="mt-2 text-xl">{userData.name}</p>
        </div>
      ) }
               </div>
               </div>
               
               <div>
                  <label className="font-bold">Message</label><br /><br />
                  <textarea name="" id="" cols="35" rows="10" className="border border-black m-2 w-7/12  h-40 focus:outline-blue-500 indent-2 resize-none" value={message} onChange={(e) => setMessage(e.target.value)}></textarea><br /><br />
               </div>
               <div className="flex flex-col w-6/12">
               <label className="font-bold" >Class</label>
               <select value={stream} className="h-14 text-md md:w-6/12 w-11/12 bg-white border outline-blue-500 rounded-md border" required onChange={(e) => setStream(e.target.value)}>
               <option value="S1 A">S1 A</option>
            <option value="S1 B">S1 B</option>
            <option value="S1 C">S1 C</option>
            <option value="S1 D">S1 D</option>
            <option value="S2 A">S2 A</option>
            <option value="S2 B">S2 B</option>
            <option value="S2 C">S2 C</option>
            <option value="S2 D">S2 D</option>
            <option value="S3 A">S3 A</option>
            <option value="S3 B">S3 B</option>
            <option value="S3 C">S3 C</option>
            <option value="S3 D">S3 D</option>
            <option value="S4 MCB">S4 MCB</option>
            <option value="S4 MPC">S4 MPC</option>
            <option value="S4 MPG">S4 MPG</option>
            <option value="S4 PCB">S4 PCB</option>
            <option value="S4 PCM">S4 PCM</option>
            <option value="S5 MCB">S5 MCB</option>
            <option value="S5 MPC">S5 MPC</option>
            <option value="S5 MPG">S5 MPG</option>
            <option value="S5 PCB">S5 PCB</option>
            <option value="S5 PCM">S5 PCM</option>
            <option value="S6 MCB">S6 MCB</option>
            <option value="S6 MPC">S6 MPC</option>
            <option value="S6 MPG">S6 MPG</option>
            <option value="S6 PCB">S6 PCB</option>
            <option value="S6 PCM">S6 PCM</option>
            </select>
               </div>
               <br />
               <button type="submit" className='mt-8 bg-blue-500 mb-4 font-bold rounded-md text-white w-4/12 m-auto h-12'>SIGN</button>
            </form>
           </div>
           <Footer/>
        </div>
     );
}
 
export default Fault;