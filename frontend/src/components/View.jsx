import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";



const ViewDocs = () => {
    
    const [name, setName] = useState('');
    const [stream, setStream] = useState('');
    const [faults, setFaults] = useState(null);
    const [permissions, setPermissions] = useState(null);

    const handleSubmit = async (e) => {
        try {
            const { data } = await axios.post("http://localhost:1338/view", {
              name,
              stream,
            });
            console.log(data);
            setFaults(data);
            const { perm } = await axios.post("http://localhost:1338/perm", {
              name, stream,
            });
            console.log("Submitting with values:", { name, stream });
            console.log(perm);
            setPermissions(perm);
          } catch (err) {
            console.log(err);
          }

    }

    

    return ( 
        <div>
        <Navbar />
        <div className="flex mt-[80px] md:flex-row items-cnter flex-col ml-4 gap-12">
            <div className="flex flex-col md:ml-[50px] w-10/12 md:w-2/12">
            <label className="font-bold" style={{marginLeft: "15%", fontSize: "30px", fontFamily: "Mukta, sans-serif",  fontWeight: "500"}}>Sort By</label>
            <label className="font-bold">Name </label>
            <input type="text" className=" border-b-2 w-11/12 border-black m-2 focus:border-blue-600 focus:outline-none border-dashed" placeholder="Enter Student Names"  value={name} onChange={(e) => setName(e.target.value)} />
            <label className="font-bold">Class</label>
            <select value={stream} className="h-14 text-md w-10/12 bg-white outline-blue-400 rounded-md border" onChange={(e) => setStream(e.target.value)} >
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
            <option value="S6 PCM">S6 PCM</option></select><br />
            <br />
            <button style={{padding: '10px 40px 10px', background: 'rgb(4, 113, 255)', color: 'white', border: 'none', borderRadius: '5px'}} onClick={handleSubmit}>Search</button>
            </div>
        
        <div className="flex flex-col items-center gap-4 md:w-4/12 w-11/12 border rounded-md" >
            <h1 className="font-bold text-center text-2xl">Queried Faults</h1>
            {faults && faults.map((fault) => (
                    <div key={fault._id} className="flex flex-col border-b gap-2 border-blue-500 text-xl w-10/12 ">
                        <p>Student Names: {fault.name}</p>
                        <p>Student Class: {fault.stream}</p>
                        <p>Signing Date: {fault.date}</p>
                        <p>Case Type: {fault.type}</p>
                        <p>Issuer: {fault.issuer}</p>
                        <p>Message: {fault.message}</p>
                        <p>Affiliate: {fault.user}</p>
                    </div>
                ))}
        
        </div>
        <div className="w-11/12 md:w-4/12 border rounded-md flex flex-col items-center gap-4 ">
         <h1 className="font-bold text-center text-2xl">Queried Permissions</h1>
         {permissions && permissions.map((permission) => (
                    <div key={permission._id} className="flex flex-col border-b gap-2 border-blue-500 text-xl w-10/12 ">
                        <p>Student Names: {permission.name}</p>
                        <p>Student Class: {permission.stream}</p>
                        <p>Signing Date: {permission.date}</p>
                        <p>Case Type: {permission.type}</p>
                        <p>Issuer: {permission.issuer}</p>
                        <p>Message: {permission.message}</p>
                        <p>Affiliate: {permission.user}</p>
                    </div>
                ))}
          </div></div>
        </div>
     );
}
 
export default ViewDocs;
