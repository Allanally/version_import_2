import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import swal from 'sweetalert';
import jsPDF from "jspdf";
import logo from './csa.jpg'

const Approvals = () => {
    const [returningDate, setReturningDate] = useState(false);
    const [returningTime, setReturningTime] = useState(false);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchPermissions = async () => {
          try {
            const response = await fetch('http://localhost:1338/pendings'); 
            if (response.ok) {
              const data = await response.json();
              setPermissions(data); 
            }
          } catch (error) {
            console.error('Error fetching approved docs:', error);
          }
        };
    
        fetchPermissions();
      }, []);

      const handleSubmit = (e, permission, index) => {



        const { name, stream,departDate, departTime, issuer, parentsContact, reason } = permission;
          e.preventDefault()
          axios.post('http://localhost:1338/permission', {
            name, stream, departDate, departTime, returningDate, returningTime, parentsContact, issuer, reason,
          })
          .then((result) => {
            console.log("Approval data sent successfully:", result);
            swal({
              title: "Successfully Approved",
              icon: "success",
              closeOnEsc: false,
              allowOutsideClick: false,
              button: true,
            })
          })
          .catch((error) => {
            console.error("Error sending approval data:", error);
            swal("Failed to approve", error)
          });
      const data = `
      Student Names: ${name}
      Justified From: ${departDate}
      At: ${departTime}
      To: ${returningDate}
      At: ${returningTime}
      Signed By :  `;

      const pdf = new jsPDF("p", "mm", "a4");

      const img = new Image();
      img.src = logo;
      img.onload = function() {
      pdf.addImage(img, 'PNG', 10, 10, 20, 20);
  
      pdf.setFontSize(30);
      pdf.text("COLLEGE ST ANDRE", 40, 25); 
  
      pdf.setLineWidth(0.5);
      pdf.line(10, 32, 180, 32);
      pdf.setFontSize(18);
      pdf.text('Justification Form', 80, 40);
      pdf.setFontSize(13);
      pdf.text(data, 45, 50); 
      pdf.setLineWidth(0.5);
      pdf.line(10, 100, 200, 100); 

      pdf.setFontSize(8);
      pdf.text("Powered By Smart-Sign: https://smartsign.com", 60, 110); 
    
      pdf.save(`${name}_justification_form.pdf`);
    }
      axios.delete('http://localhost:1338/pendings', {
        name, departDate, departTime, issuer, returningDate, returningTime, reason, stream
       })
       .then((result) => {
        console.log("Permission deleted successfully:", result);
      })
      .catch((error) => {
        console.error("Error deleting approval data:", error);
      });
  
      if (setPermissions) {
        setPermissions((prevPermissions) => {
          const updatedPermissions = [...prevPermissions];
          updatedPermissions.splice(index, 1);
          return updatedPermissions;
        });
      }
    }
    
    
    const [selected, setSelected] = useState('')

    const toggle = (index) => {
    if(selected === index){
    return setSelected(null)
    }

    setSelected(index);
    }

    

 const handleDelete = (index) =>{
  const name = permissions[index].name
  const departDate = permissions[index].departDate
  const departTime = permissions[index].departTime
  const issuer = permissions[index].issuer
  const reason = permissions[index].reason
  const stream = permissions[index].stream
 axios.delete('http://localhost:1338/pendings', {
  name, departDate, departTime, issuer, reason, stream
 })
 .then((result) => {
  console.log("Permission deleted successfully:", result);
})
.catch((error) => {
  console.error("Error deleting approval data:", error);
});
if (setPermissions) {
  setPermissions((prevPermissions) => {
    const updatedPermissions = [...prevPermissions];
    updatedPermissions.splice(index, 1);
    return updatedPermissions;
  });
}
 }

  return (

    <>
   
    <Navbar />
     <div className='flex flex-col items-center gap-4'>
        { console.log("datas", permissions)}
      <div className="lg:w-[50vw] w-[95%] mt-[12vh] overflow-hidden border border-blue-400 transition-all duration-50 ease-in-out ">

        <div className="w-full">
        {permissions.length === 0 ? (
            <div className='flex justify-center'>
            <h1 className='text-2xl m-4'>No Pending Approvals</h1>
            </div>
        ) :permissions.map((permission, index) => (
            <div className="item flex flex-col items-center" key={index} >
            <div className=" md:flex md:gap-2 cursor-pointer mb-4" onClick={() => toggle(index)}>
            <h2 className={selected == index ? `text-[1.3rem] font-bold`: 'text-[1.3rem]'} >Student Names: {permission.name} </h2>
                
                <span className='ml-[20em]'>{selected == index ? '-' : '+'}</span>
            </div>
            <div className={selected == index ? 'transition-all duration-0 ease-in-out max-h-[9999px] h-auto flex flex-col border-b gap-2 border-blue-500 text-xl font-bold w-10/12 ' : 'transition-all duration-0 ease-in-out overflow-hidden max-h-0 ml-5'} >
                <p>Departure Date: {permission.departDate} </p>
                <p>Departure Time: {permission.departTime} </p>
                <div className='flex gap-4'>
  <label className='font-boxes' > Return Date: </label>
                    <input type="date" className='boxes border outline-blue-400 rounded-md w-9/12' required value={returningDate} onChange={(e) => setReturningDate(e.target.value)}/>
                </div>
              
                   <div className='flex gap-4'>
                   <label className='font-boxes'> Return Time: </label>
                        <input type="time" className='boxes border outline-blue-400 rounded-md w-9/12'required value={returningTime} onChange={(e) => setReturningTime(e.target.value)} />
                   </div>
                    <p>Reason: {permission.reason}</p>
                    <p>class: {permission.stream}</p>
                    <div className='mt-3 cursor-pointer flex  justify-between'>
                    <button className='rounded-md bg-green-700 py-2 px-2 mb-2 text-white' onClick={(e) => handleSubmit(e, permission)}>Approve Return</button>
                    <FaTrash className='text-red-500' onClick={() => handleDelete(index)} />
                    </div>
                    
            </div>
            </div>
            ))}
        </div>
      </div>
    </div>
    </>
  )}

export default Approvals
        
