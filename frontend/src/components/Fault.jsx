import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import Footer from "./Footer";
const Fault = () => {
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [issuer, setIssuer] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [userData, setUserData] = useState(null);
    const [showForm, setShowForm] = useState(false)
    const [firstStream, setFirstStream] = useState('');
    const [firstName, setFirstName] = useState('')
    const [firstStudents, setFirstStudents] = useState([])
    const [showButton, setShowButton] = useState(true);
    const [showSelect, setShowSelect] = useState(false);
    const [showInitials, setShowInitials] = useState(true);
    const [faultings, setFaultings] = useState([])
    const [selectedFault, setSelectedFault] = useState(null);
    const [mark, setMarks] = useState('')
    const name = firstName
    const stream = firstStream

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
    useEffect(() => {
      const fetchFaultings = async () => {
        try {
          const response = await fetch('http://localhost:1338/faulting'); 
          if (response.ok) {
            const data = await response.json();
            setFaultings(data); 
            console.log(data);
          }
        } catch (error) {
          console.error('Error fetching approved docs:', error);
        }
      };
  
      fetchFaultings();
    }, [])

    const handleSelect = (faulting) => {
      setSelectedFault(faulting)
    }

   const navigate = useNavigate('');

   const handleSubmit = (e) =>{
      e.preventDefault()
      if (!selectedFault) {
        console.error("No fault selected");
        return;
      }
      axios.post('http://localhost:1338/fault', {
        name, date, type, issuer, message, stream, mark: selectedFault.marks
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
        <div className="fault-container">
            <Navbar />
           <div className="md:w-8/12 w-11/12 mt-36 min-h-fit border-2 border-blue-500 rounded-md m-auto">
            <h1 className="text-3xl text-center font-bold">Discipline Signing Form</h1>
            <br />
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
            <option key={student._id} value={student.name} >
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
            <form onSubmit={handleSubmit} className='w-11/12 m-auto text-md mt-10  flex-col flex'>
               <div className="flex w-full text-md flex-col">
            <label className="font-bold" >Student Names</label>
                <p>{firstName}</p>
              </div> <div className="flex flex-col">
                <label className="font-bold">Signing Date</label>
                <input type="date" className="border indent-4 m-2 focus:outline-blue-400 rounded-md h-[5vh]" onChange={(e) => setDate(e.target.value)} required />
               </div>
               <div className="flex">
                  <div className="flex flex-col w-6/12">
                  <label className="font-bold" >Case Type</label>
                  <select value={type} className="h-14 text-md md:w-6/12 w-11/12 bg-white outline-blue-500 rounded-md border" required  onChange={(e) => {
                   setType(e.target.value);
                   handleSelect(faultings.find((faulting) => faulting.fault === e.target.value));
                   }}>
                    {faultings.map((faulting, index) => (
                   <option key={index} value={faulting.fault}>
                    <div className="flex gap-4 ">
                    <p>{faulting.fault}</p>
                    <p>{faulting.marks}</p>
                    </div>
            </option>
                    ))}
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
              <p>{firstStream}</p>
               </div>
               <br />
               <button type="submit" className='mt-8 bg-blue-500 mb-4 font-bold rounded-md text-white w-4/12 m-auto h-12'>SIGN</button>
            </form>)}
           </div>
           <Footer/>
        </div>
     );
}
 
export default Fault;