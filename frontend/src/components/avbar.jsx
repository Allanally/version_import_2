import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.0cfaa4df.png';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaTrash } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import axios from 'axios';
import swal from 'sweetalert';
import jsPDF from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';


const Navbar = () => {

    const [showModal, setShowModal] = useState(false);
    const [returnDate, setReturnDate] = useState(false);
    const [returnTime, setReturnTime] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
      const fetchPermissions = async () => {
        try {
          const response = await fetch('http://localhost:1337/pendings'); 
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

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearchEnter = (e) => {
      if (e.key === 'Enter') {
        setSearchActive(!!searchQuery.trim()); 
      }
    };
  
   
   {/* permissions = searchActive
      ? permissions.filter(
          (permission) =>
            permission.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : permissions; */}

      const location = useLocation();

      const handleButtonClick = () => {
        if (location.pathname === '/permission') {
          setShowModal(true);
        }
      };
      
 
   const handleCloseModal = () => {
     setShowModal(false);}

    const navRef = useRef();
 
    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }


    const handleSubmit = (e, permission, index) => {



      const { name, stream,departDate, departTime, issuer, reason } = permission;
        e.preventDefault()
        axios.post('http://localhost:1337/permission', {
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
        const { data } = await axios.post("http://localhost:1337", {

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
      removeCookie("jwt");
      navigate("/login");
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
 axios.delete('http://localhost:1337/pendings', {
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
        <div className="navbar">
          <div className='navbarr'>
            <div>
            <img src={logo} alt="Smart Sign" />
          </div>
           
           <div>
             <header>
            <nav ref={navRef}>
                <ul className='nav-links'>
                     <li className='app'><Link to="/view">View Docs</Link></li>
                    <li> <Link to="/first"> New Document</Link></li>
                    
                   <li onClick={handleButtonClick} className='app'>Approvals</li>
                   
                    <li onClick={handleLogout} className='log'>Logout</li>
                </ul>
                <button onClick={showNavBar} className='nav-btn nav-close-btn'><FaTimes /></button>
            </nav>
         
               <button onClick={showNavBar} className='nav-btn bars'><FaBars /></button>
             </header>
           </div>
          </div>
          
           
            {showModal && (
                   <div className="modal-container">
                  <div className="modal-content" style={{  maxHeight: "500px", overflowY: "auto" }}>
        { /*         <input
        type="text"
        placeholder="Search Here!"
        value={searchQuery}
        onChange={handleSearch}
        onKeyDown={handleSearchEnter} 
            /> */}
                  <br />
                   <button className='modalbtn' onClick={handleCloseModal}><IoMdExit /></button>

              <div className="morediv">

                <div className="accordion">
                  {permissions.length === 0 ? (
                    <div>
                      <h1 style={{ fontSize: "20px", textAlign: "center", fontWeight: "500", fontFamily: "Mukta, sans-serif"}}>No Pending Approvals</h1>
                    </div>
                  ) :permissions.map((permission, index) => (
                    <div className="item" key={index}>
                      <div className="little-cont" onClick={() => toggle(index)}>
                       <h2>Student Names: {permission.name} </h2>
                         
                         <span>{selected == index ? '-' : '+'}</span>
                      </div>
                      <div className={selected == index ? 'full-cont show' : 'full-cont'} >
                        <p>Departure Date: {permission.departDate} </p>
                         <p>Departure Time: {permission.departTime} </p>
                          <label className='font-boxes' > Return Date: </label>
                            <input type="date" className='boxes' required value={returnDate} onChange={(e) => setReturnDate(e.target.value)}/><br /><br />
                               <label className='font-boxes'> Return Time: </label>
                                 <input type="time" className='boxes'required value={returnTime} onChange={(e) => setReturnTime(e.target.value)} /><br />
                             <p>Reason: {permission.reason}</p>
                             <p>class: {permission.stream}</p>
                             <button className='approvebtn' onClick={(e) => handleSubmit(e, permission)}>Approve Return</button>
                             <FaTrash onClick={() => handleDelete(index)} style={{marginLeft: "80%", cursor: "pointer", color: "red"}}/>
                      </div>
                    </div>
                    ))}
                   </div>
                  </div>
            
                    </div>
                    </div>
                    )}
                  <ToastContainer />
        </div>
      
    );
}


export default Navbar;
