import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import First from "./components/First";
import Permission from "./components/Permission";
import Fault from "./components/Fault";
import "react-toastify/dist/ReactToastify.css"
import ViewDocs from "./components/View";
import Approvals from "./components/Approvals";
import ForgotPwd from "./components/ForgotPwd";

function App() {

  return (
   
<Routes>
    <Route path="*" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgotpwd" element={<ForgotPwd />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/first" element={<First />} />
    <Route path="/permission" element={<Permission />} />
    <Route path="/fault" element={<Fault />} />
    <Route path="/view" element={<ViewDocs />} />
    <Route path="/approvals" element={<Approvals />} />

   
</Routes>
 
  );
}

export default App;
