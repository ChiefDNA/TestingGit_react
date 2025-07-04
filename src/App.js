import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import IndexPage from './pages/IndexPage';
import Materials from './pages/Materials';
import Registration from './pages/Registration';
import Login from './pages/Login';
import AddMaterials from './pages/AddMaterials';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const stored = localStorage.getItem('TestingGit');

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('TestingGit');
    setUser(null);
  }

  return (
    <Router>
      <Sidebar userRole={user?.role} onLogout={handleLogout}/>
      <Section> 
        <SkeletonTheme baseColor='#20202046' highlightColor='#444' duration={1.5}>
          <Routes>
            <Route path="/" element={<IndexPage />}/>
            <Route path="/TestingGit_react" element={<IndexPage />}/>
            <Route path="/Materials" element={<Materials user={user}/>} />
            <Route path="/Register" element={<Registration replacement={replacement} isValidContact={isValidContact}  UserAlert={UserAlert} />} />
            <Route path="/Login" element={<Login replacement={replacement} isValidContact={isValidContact}  UserAlert={UserAlert} setUser={setUser} />} />
            <Route path='/AddMaterials' element={<AddMaterials replacement={replacement} user={user} />} />
          </Routes>
        </SkeletonTheme>
      </Section>
      
    </Router>
  );
}


function isValidContact(value) {
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{7,15}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}

function replacement(event, pin){
  const input = event.target;

  switch (pin) {
    case 1: //username
      input.value = input.value.replace(/[^a-zA-Z0-9 ]/g,()=>UserAlert(input));    
      break;
    case 2: //password
      input.value = input.value.replace(/[^a-zA-Z0-9 @.!#$%&*]/g,()=>UserAlert(input));    
      break;
    case 3: //contacts
      input.value = input.value.replace(/[^a-zA-Z0-9.@ ]/g,()=>UserAlert(input));    
      break;
    case 4: //address
      input.value = input.value.replace(/[^a-zA-Z0-9. ,/_-]/g,()=>UserAlert(input));    
      break;
    case 5: //date of birth
      input.value = input.value.replace(/[^0-9-]/g,()=>UserAlert(input));    
      break;
    case 6: //numbers    
      input.value = input.value.replace(/[^0-9]/g,()=>UserAlert(input));
      break;
    default:
      break;
  }    

}
function UserAlert( input, msg = "AlphaNumeric characters Only"){
  if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("char-warning")){
    const message = document.createElement("div");
    message.textContent = msg;
    message.className = "char-warning";
    input.parentElement.appendChild(message);

    setTimeout(()=>{
      if (message && message.parentElement){
        message.remove();
      }
    },2000);
  }
  return "";
}


export default App;
