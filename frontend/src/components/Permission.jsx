import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jsPDF from "jspdf";
import Footer from "./Footer";
import axios from "axios";
import QRCode from "qrcode";
import Modal from "./Modal";




const Permission = () => {
  const navigate = useNavigate('')
  const [showQRCode, setShowQRCode] = useState(false); 
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [reason, setReason] = useState('');
  const [issuer, setIssuer] = useState('');
  const [stream, setStream] = useState('');
  const [qrcodeData, setQRCodeData] = useState(null); 
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
 
  const handleSubmit = (e) => {
  
  e.preventDefault()

  const data = `Student Names: ${name}
  Departure Date: ${departDate}
  Departure Time: ${departTime}
  Return Date: ${returnDate}
  Return Time: ${returnTime}
  Issuer: ${issuer}
  Reason: ${reason}
  Class: ${stream}`;
  
  setQRCodeData(data);
  setShowQRCode(true);

  axios.post('http://localhost:1338/pendings', {
    name, departDate,departTime, issuer, reason, stream
  })
  .then(result => {
    console.log(result);
    showCode();
  })
 .catch(err => {
    console.log(err);
    swal("Failed to Permit!!!!");
  });

  };
  const showCode = () =>{
 
  }

   
  const handleClick = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString(); // Date in a readable format
    const currentTime = now.toLocaleTimeString();

    const heading = "QrCode For Permission";
    const data = `
                 ${currentDate}   ${currentTime}`;
    
  
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFontSize(20);
    pdf.text(heading, 105, 20, null, null, "center");
    pdf.setFontSize(15);
    pdf.text(data, 45, 30);
  
    // Generate QR code as a PNG image
    QRCode.toDataURL(qrcodeData, { errorCorrectionLevel: "H" }, function (err, url) {
      if (err) {
        console.error(err);
        return;
      }
  
      // Add the QR code image to the PDF
      pdf.addImage(url, "PNG", 65, 40, 80, 72);
  
      pdf.save(`${name}_permission_form`);
      navigate('/first');
    });
  };
  

  return (
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
   
<label className="">Issuer</label>
{userData && (
        <div>
          <p className="mt-2 text-xl">{userData.name}</p>
        </div>
      )}

</div>
<div className="flex flex-col w-6/12">
<label className="">Reason</label>
   <input type="text" className='border-b w-10/12 outline-blue-400 h-12' value={reason} onChange={(e) =>setReason(e.target.value)}  />
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
<button onClick={() => setOpen(true)} type="submit" className="mt-8 bg-blue-500 font-bold rounded-md text-white w-4/12 m-auto h-12">SIGN</button><br /><br/>
         
        </form>
        <Modal open={open} onClose={() => setOpen(false)}>
        <div>
               {showQRCode && (
         <div id="qrcode" className="m-3 b-2 shadow-xl flex flex-col items-center mt-0 ml-0 w-full h-full bg-black-100">
          <div className="flex flex-col items-center ">
            <h1 className="text-xl font-bold">{name}</h1>
            <h2 className="md:text-xl">Print The QrCode Below For Pass</h2>
            <div className="real">
          <button onClick={handleClick} id="button" className="mt-8 bg-blue-500 font-bold rounded-md text-white w-[80px] mb-2 m-auto h-12">Print</button>
          </div>
          </div>
         </div>)}
        </div>
        </Modal>
 
        </div>
        <Footer />
    </div>
  );
};


export default Permission;

{
  /*
    {qrcodeData && (
            <QRCode
              value={qrcodeData}
              size={200}
              level="H" style={{ padding: "20px", border: "1px solid rgb(4, 113, 255)", borderRadius: "5px"}} />
          )}
  */
}

