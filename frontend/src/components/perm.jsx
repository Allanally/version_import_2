import Navbar from "./Navbar";
import React, { useState } from "react";
import QRCode from "qrcode.react";
import { IoMdExit } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jsPDF from "jspdf";
import Footer from "./Footer";
import axios from "axios";



const Permission = () => {
  const navigate = useNavigate('')
  const [isPopupVisible, setPopupVisibility] = useState(false);


  const [name, setName] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [issuer, setIssuer] = useState('');
  const [reason, setReason] = useState('');
  const [stream, setStream] = useState('');

  const [qrcodeData, setQRCodeData] = useState(''); 
  
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = `Student Names: ${name}
    Departure Date: ${departDate}
    Departure Time: ${departTime}
    Return Date: ${returnDate}
    Return Time: ${returnTime}
    Issuer: ${issuer}
    Reason: ${reason}
    Class: ${stream}`;
    
    // Send data to the server
    axios.post('http://localhost:1338/pendings', {
      name, departDate, departTime, issuer, reason, stream
    })
    .then(result => {
      console.log(result);
      
      // After successful submission, set QR code data and show the QR code
     { /*setQRCodeData(data);
    showCode(); */}
    })
    .catch(err => {
      console.error(err);
      swal("Failed to Permit!!!!");
    });
  };
  
  const showCode = () =>{
    setPopupVisibility(true);
  }

  const closePopup = () => {
    setPopupVisibility(false);
  };

   
  const handleClick = () => {
    const heading = "Permission Form";
    const data = `Student Names: ${name}
    Departure Date: ${departDate}
    Departure Time: ${departTime}
    Return Date: ${returnDate}
    Return Time: ${returnTime}
    Issuer: ${issuer}
    Reason: ${reason}
    Class: ${stream}`;
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFontSize(20);
    pdf.text(heading, 105, 20, null, null, "center");
    pdf.setFontSize(15);
    pdf.text(data, 45, 30); 
  
    pdf.save(`${name}_permission`);
    navigate('/first')
}

  return (
    <div>
    <Navbar />
    <div className="sm:w-8/12 mt-[17vh] min-h-fit min-w-fit rounded-md shadow-lg m-auto">
      <h1 className='text-3xl text-center font-bold'>Permission Form</h1>
      {isPopupVisible ? (
        <div id="qrcode" className={`fixed inset-0 bg-black  bg-opacity-50 backdrop-blur-lg transition-opacity ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button className="btn"><IoMdExit /></button>
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[400px] h-[300px] p-4 rounded-md z-10 transition-opacity ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1>{name}</h1>
            <h2 style={{ fontFamily: "Mukta, sans-serif", fontWeight: "300" }}>Scan The QR Code below to get your permission</h2>
            <div className="real">
              <div className="w-16 h-16">
                  {qrcodeData && (
                <QRCode
                  value={qrcodeData}
                  size={200}
                  level="H" style={{ padding: "20px", border: "1px solid rgb(4, 113, 255)", borderRadius: "5px", color: 'black' }} />
              )}
              </div>
              <button onClick={handleClick} className="button">Print</button>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='sm:w-11/12 w-full  m-auto mt-10 p-2 flex-col flex'>
        <label className="font" >Student Names</label><br />
        <input type="text" className="border-b-2 border-black m-2 focus:border-blue-600 focus:outline-none border-dashed" required placeholder="Eg: StudentName..."  value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <div className="flex ">
        <div className="flex flex-col gap-2 w-6/12">
            <label className="">Departure Date</label>
            <input type="date" className='border-b w-10/12 outline-blue-400' required value={departDate}
        onChange={(e) => setDepartDate(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-6/12">
        <label className="">Departure Time</label>
            <input type="time" className='border-b w-10/12 outline-blue-400 w-10/12' required  value={departTime}
        onChange={(e) => setDepartTime(e.target.value)} /><br />
        </div>
        </div>
        <div className="flex" >
        <div className="flex flex-col gap-2 w-6/12">
        <label className="">Return Date</label>
            <input type="date" className='border-b w-10/12 outline-blue-400' required  value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}/><br />
        </div>
        <div className="flex flex-col gap-2 w-6/12">
        <label className=""> Return Time</label>
            <input type="time" required className='border-b w-10/12 outline-blue-400'  value={returnTime}
        onChange={(e) => setReturnTime(e.target.value)} /><br />
        </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-6/12">
        <label className="required">Issuer</label>
           <select className='h-14 text-md w-10/12 bg-white outline-blue-400 rounded-md border' value={issuer} onChange={(e) => setIssuer(e.target.value)} required >
            <option value="Discipline-Prefect">Discipline Prefect</option>
            <option value="Patron">Patron</option>
            <option value="Metron">Metron</option>
           </select>
        </div>
        <div className="flex flex-col w-6/12">
        <label className="">Reason</label>
            <select className="h-14 text-md w-10/12 bg-white outline-blue-400 rounded-md border"  value={reason}  onChange={(e) => setReason(e.target.value)} required >
            <option value="Medical Care">Medical Care</option>
            <option value="Family Issues">Family Issues</option>
            <option value="Other">Other</option>
           </select>
        </div><br />
        </div>
        
        <div className="" style={{marginBottom: "10px", marginTop: "10px"}}>
        <label className="font">Class</label>
            <br /><br />
            <select className="h-14 text-md w-5/12 bg-white outline-blue-400 rounded-md border" value={stream} onChange={(e) => setStream(e.target.value)}>
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
        <button onClick={showCode} type="submit" className="mt-8 bg-blue-500 font-bold rounded-md text-white w-4/12 m-auto h-12">SIGN</button>
         </form>
      )}
    </div>
    <Footer />
  </div>
  );
};


export default Permission;


{/*
<div>
      <Navbar />
      <div className="sm:w-8/12 mt-[17vh] min-h-fit min-w-fit rounded-md shadow-lg  m-auto"> 
      <h1 className='text-3xl text-center font-bold'>Permission Form</h1>
        <form onSubmit={handleSubmit} className='sm:w-11/12 w-full  m-auto mt-10 p-2 flex-col flex'>
<label className="font" >Student Names</label><br />
<input type="text" className="border-b-2 border-black m-2 focus:border-blue-600 focus:outline-none border-dashed" required placeholder="Eg: Ganza Hodari..."  value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
<div className="flex ">
<div className="flex flex-col gap-2 w-6/12">
    <label className="">Departure Date</label>
    <input type="date" className='border-b w-10/12 outline-blue-400' required value={departDate}
onChange={(e) => setDepartDate(e.target.value)} />
</div>
<div className="flex flex-col gap-2 w-6/12">
<label className="">Departure Time</label>
    <input type="time" className='border-b w-10/12 outline-blue-400 w-10/12' required  value={departTime}
onChange={(e) => setDepartTime(e.target.value)} /><br />
</div>
</div>
<div className="flex" >
<div className="flex flex-col gap-2 w-6/12">
<label className="">Return Date</label>
    <input type="date" className='border-b w-10/12 outline-blue-400' required  value={returnDate}
onChange={(e) => setReturnDate(e.target.value)}/><br />
</div>
<div className="flex flex-col gap-2 w-6/12">
<label className=""> Return Time</label>
    <input type="time" required className='border-b w-10/12 outline-blue-400'  value={returnTime}
onChange={(e) => setReturnTime(e.target.value)} /><br />
</div>
</div>
<div className="flex">
  <div className="flex flex-col w-6/12">
<label className="required">Issuer</label>
   <select className='h-14 text-md w-10/12 bg-white outline-blue-400 rounded-md border' value={issuer} onChange={(e) => setIssuer(e.target.value)} required >
    <option value="Discipline-Prefect">Discipline Prefect</option>
    <option value="Patron">Patron</option>
    <option value="Metron">Metron</option>
   </select>
</div>
<div className="flex flex-col w-6/12">
<label className="">Reason</label>
    <select className="h-14 text-md w-10/12 bg-white outline-blue-400 rounded-md border"  value={reason}  onChange={(e) => setReason(e.target.value)} required >
    <option value="Medical Care">Medical Care</option>
    <option value="Family Issues">Family Issues</option>
    <option value="Other">Other</option>
   </select>
</div><br />
</div>

<div className="" style={{marginBottom: "10px", marginTop: "10px"}}>
<label className="font">Class</label>
    <br /><br />
    <select className="h-14 text-md w-5/12 bg-white outline-blue-400 rounded-md border" value={stream} onChange={(e) => setStream(e.target.value)}>
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
<button onClick={showCode} type="submit" className="mt-8 bg-blue-500 font-bold rounded-md text-white w-4/12 m-auto h-12">SIGN</button><br /><br/>
         
        </form>
         <div id="qrcode"  className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg transition-opacity ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button className="btn"><IoMdExit /></button>
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md z-10 transition-opacity ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1>{name}</h1>
            <h2 style={{ fontFamily: "Mukta, sans-serif", fontWeight: "300"}}>Scan The QrCode below to get your permission </h2>
            <div className="real">
         {qrcodeData && (
            <QRCode
              value={qrcodeData}
              size={200}
              level="H" style={{ padding: "20px", border: "1px solid rgb(4, 113, 255)", borderRadius: "5px"}} />
          )}
          <br />
          <button onClick={handleClick} className="button">Print</button>
          <button onClick={closePopup}>Close</button>
          </div>
          </div>
         </div>
        </div>
        <Footer />
    </div>
*/}
