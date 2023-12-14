import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.0cfaa4df.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaTrash } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import axios from 'axios';
import swal from 'sweetalert';
import jsPDF from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';


const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState(false);
  const [returnTime, setReturnTime] = useState(false);
  const [permissions, setPermissions] = useState([]);




    const location = useLocation();

    const handleButtonClick = () => {
      if (location.pathname === '/permission') {
        setShowModal(true);
      }
    };
    

 const handleCloseModal = () => {
   setShowModal(false);}


  const handleSubmit = (e, permission, index) => {



    const { name, stream,departDate, departTime, issuer, reason } = permission;
      e.preventDefault()
      axios.post('http://localhost:1338/permission', {
        name, stream, departDate, departTime, returnDate, returnTime, issuer, reason,
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
      const heading = "Justification Form";
  const data = `Student Names: ${name}
  Justified From: ${departDate}
  At: ${departTime}
  To: ${returnDate}
  At: ${returnTime}
  Signed By :  `;
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.setFontSize(20);
  pdf.text(heading, 105, 20, null, null, "center");
  pdf.setFontSize(15);
  pdf.text(data, 45, 30); 

  pdf.save(`${name}_justification_form.pdf`);

  if (setPermissions) {
    setPermissions((prevPermissions) => {
      const updatedPermissions = [...prevPermissions];
      updatedPermissions.splice(index, 1);
      return updatedPermissions;
    });
  }
}
const navigate = useNavigate('');
 const [cookies, setCookie, removeCookie] = useCookies([]);
 useEffect(() => {
  const verifyUser = async () => {
    if(!cookies.jwt){
      navigate("/login");
    }else{
      const { data } = await axios.post("http://localhost:1338", {

      }, { withCredentials: true});
      if(!data.status) {
        removeCookie("jwt");
        navigate("/login");
      }else toast(`HI ${data.user}`)
    }
  };
 verifyUser();
 }, [cookies, navigate, removeCookie])

  const handleLogout = () => {
    localStorage.clear();
    removeCookie("jwt");
    navigate("/login");
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
    
    <nav className='sm:px-16 px-6 border-b shadow-md w-full flex items-center py-5 fixed top-0 z-20 bg-white'>
       <div className="w-full flex justify-between
       items-center max-w-7xl mx-auto">
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
         <ul className='list-none hidden sm:flex flex-row gap-10'>
         <li className='text-xl cursor-pointer hover:text-blue-500 '><Link to="/view">View Docs</Link></li>
              <li className='text-xl cursor-pointer hover:text-blue-500 ' ><Link to="/first"> New Document</Link></li>
              <li className='text-xl cursor-pointer hover:text-blue-500 '><li><Link to="/approvals">Approvals</Link></li></li>
              <li onClick={handleLogout} className='text-xl cursor-pointer hover:text-blue-500 '>Logout</li>
         </ul>
         <div className='sm:hidden flex flex-1 justify-end items-center'>

         <p  onClick={() => setToggle(!toggle)}> {toggle ? <FaTimes className='w-[28px] h-[28px]  object-contain cursor-pointer' /> : <FaBars className='w-[28px] h-[28px]  object-contain cursor-pointer' /> }  </p>
                <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-blue-400 text-white absolute
                top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                      <ul className='list-none flex justify-end items-start flex-col gap-4'>
                      <li><Link to="/view">View Docs</Link></li>
              <li><Link to="/first"> New Document</Link></li>
              <li><Link to="/approvals">Approvals</Link></li>
              <li onClick={handleLogout} >Logout</li>
         </ul>
                </div>
         </div>
       </div>
    </nav>
  );
};

export default Navbar;
