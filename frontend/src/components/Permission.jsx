import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jsPDF from "jspdf";
import Footer from "./Footer";
import axios from "axios";
import QRCode from "qrcode";
import Modal from "./Modal";
import logo from './csa.jpg'


const Permission = () => {
  const navigate = useNavigate('')
  const [showQRCode, setShowQRCode] = useState(false); 
  const [open, setOpen] = useState(false)
  const [departDate, setDepartDate] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [reason, setReason] = useState('');
  const [issuer, setIssuer] = useState('');
  const [parentsContact, setParentsContact] = useState('');
  const [qrcodeData, setQRCodeData] = useState(null); 
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false)
  const [firstStream, setFirstStream] = useState('');
  const [firstName, setFirstName] = useState('')
  const [firstStudents, setFirstStudents] = useState([])
  const [showButton, setShowButton] = useState(true);
  const [showSelect, setShowSelect] = useState(false);
  const [showInitials, setShowInitials] = useState(true);
  const name = firstName
  const stream = firstStream

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setIssuer(parsedData.name);

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
  Parents Contact: ${parentsContact}
  Reason: ${reason}
  Class: ${stream}`;
  
  setQRCodeData(data);
  setShowQRCode(true);

  axios.post('http://localhost:1338/pendings', {
    name, departDate,departTime, issuer, reason,parentsContact,  stream
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
  
    const data = `${currentDate}   ${currentTime}`;
  
    const pdf = new jsPDF('p', 'mm', 'a4');

    const img = new Image();
    img.src = logo;
  
    img.onload = function () {
      pdf.addImage(img, 'PNG', 10, 10, 20, 20);
  
      pdf.setFontSize(30);
      pdf.text("COLLEGE ST ANDRE", 40, 25); 
  
      pdf.setLineWidth(0.5);
      pdf.line(10, 32, 180, 32);
      pdf.setFontSize(16);
      pdf.text('Permission Qr Code', 80, 40);
  
      pdf.setFontSize(15);
      pdf.text(data, 70, 50); 

      QRCode.toDataURL(qrcodeData, { errorCorrectionLevel: 'H' }, function (err, url) {
        if (err) {
          console.error(err);
          return;
        }
  
        pdf.addImage(url, "PNG", 65, 55, 80, 72); 
  
        pdf.setLineWidth(0.5);
        pdf.line(10, 140, 200, 140); 
  
        pdf.setFontSize(8);
        pdf.text("Powered By Smart-Sign: https://smartsign.com", 60, 145); 
  
        pdf.save(`${name}_permission_form`);
        navigate('/first');
      });
    };
  };
   
  const handlePreSubmit = (e) => {
    e.preventDefault();
  
    axios.post("http://localhost:1338/students", { stream: firstStream })
      .then((res) => {
        setFirstStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
      setShowButton(false);
      setShowSelect(true);
  };
   
  const handleShowForm = () => {
    setShowSelect(false);
    setShowInitials(false);
    setShowForm(true);
  }
  
  return (
    <div>
      <Navbar />
      <div className="sm:w-8/12 mt-[17vh] min-h-fit min-w-fit rounded-md shadow-lg  m-auto"> 
      <h1 className='text-3xl text-center font-bold'>Permission Form</h1>
      {showInitials &&  (
        <form className='sm:w-11/12 w-full  m-auto mt-10 p-2 flex-col flex'>
      <div className="flex gap-2 mb-4">
            <div className="flex flex-col w-6/12">
            <label className="font">Class</label>
    <select className="h-14 text-md  w-11/12 bg-white outline-blue-400 rounded-md border" value={firstStream} onChange={(e) => setFirstStream(e.target.value)}>
            <option value="S1A">S1 A</option>
            <option value="S1B">S1 B</option>
            <option value="S1C">S1 C</option>
            <option value="S1D">S1 D</option>
            <option value="S2A">S2 A</option>
            <option value="S2B">S2 B</option>
            <option value="S2C">S2 C</option>
            <option value="S2D">S2 D</option>
            <option value="S3A">S3 A</option>
            <option value="S3B">S3 B</option>
            <option value="S3C">S3 C</option>
            <option value="S3D">S3 D</option>
            <option value="S4MCB">S4 MCB</option>
            <option value="S4MPC">S4 MPC</option>
            <option value="S4MPG">S4 MPG</option>
            <option value="S4PCB">S4 PCB</option>
            <option value="S4PCM">S4 PCM</option>
            <option value="S5MCB">S5 MCB</option>
            <option value="S5MPC">S5 MPC</option>
            <option value="S5MPG">S5 MPG</option>
            <option value="S5PCB">S5 PCB</option>
            <option value="S5PCM">S5 PCM</option>
            <option value="S6MCB">S6 MCB</option>
            <option value="S6MPC">S6 MPC</option>
            <option value="S6MPG">S6 MPG</option>
            <option value="S6PCB">S6 PCB</option>
            <option value="S6PCM">S6 PCM</option>
            </select>
            </div>
            <div className="flex flex-col w-5/12">
            <label className="font" >Student Names</label>
            <select
          className="h-14 text-md w-11/12 bg-white outline-blue-400 rounded-md border"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        >
          {firstStudents.map(student => (
            <option key={student._id} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>
            </div>
          </div>
          {showButton && (
          <button type="submit" onClick={handlePreSubmit} className="mt-8 bg-blue-500 font-bold rounded-md text-white w-4/12 m-auto h-12">SEND</button>
          )}
          {showSelect && (
            <button onClick={handleShowForm}  className="mt-8 bg-blue-500 font-bold rounded-md text-white w-4/12 m-auto h-12">CONFIRM</button>
          )}
      
      </form>
      )}
      
      {showForm && (
        <form onSubmit={handleSubmit} className='sm:w-11/12 w-full  m-auto mt-10 p-2 flex-col flex'>
          <div className="flex gap-2 mb-4">
            <div className="flex flex-col w-6/12">
            <label className="font">Class</label>
             {firstStream}
            </div>
            <div className="flex flex-col w-5/12">
            <label className="font" >Student Names</label>
            {firstName}
            </div>
          </div>

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
</div>
</div>
<div className="flex gap-5">
<div className="flex flex-col w-6/12 mt-4">
<label className="">Parents Contact</label>
   <input type="contact" className='border-b w-10/12 outline-blue-400 h-12' value={parentsContact} onChange={(e) =>setParentsContact(e.target.value)}  />
</div>
</div>

<button onClick={() => setOpen(true)} type="submit" className="mt-8 bg-blue-500 font-bold rounded-md text-white w-4/12 m-auto h-12">SIGN</button><br /><br/>
         
        </form>)}
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

{/* 
   const handleClick = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString(); // Date in a readable format
    const currentTime = now.toLocaleTimeString();

    const heading = "QrCode For Permission";
    const data = `
                 ${currentDate}   ${currentTime}
                 `;
    
  
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
  
*/}

