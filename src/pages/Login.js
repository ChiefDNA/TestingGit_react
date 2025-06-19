import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login({replacement, isValidContact, UserAlert, setUser}){
    const [form, setForm] = useState({
        username: '',
        contact: '',
        password: '',
        choice: false
    })
    const fields = {
        userfield: document.getElementById('username'),
        contact: document.getElementById('contact'),
        password: document.getElementById('password'),
        remember: document.querySelector('.Tggl-btn-wrap input'),
        choice: 1
    }
    const navigate = useNavigate();

    function handleLoginChoice(){   
        const isUsernameVisible = !fields.userfield.classList.contains('form-items-Sw');

        if (isUsernameVisible){
            fields.userfield.className = 'form-items-Sw';
            fields.contact.className = 'form-items';
            fields.userfield.toggleAttribute('required');
            fields.contact.toggleAttribute('required');
            setForm({ ...form, choice: false});
        } else {
            fields.userfield.className = 'form-items';
            fields.contact.className = 'form-items-Sw';
            fields.userfield.toggleAttribute('required');
            fields.contact.toggleAttribute('required');
            setForm({ ...form, choice: true});
        }
    }

    function handleChange(e, pin){
        replacement(e, pin);

        setForm({ ...form, [e.target.id]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        let data = {};
        if (form.choice){
            if (!isValidContact(form.contact)){
                UserAlert(fields.contact, "Enter a valid phone number or email address");
                return ;
            }
            data = {'contact':form.contact, 'password':form.password};//, 'remember':fields.choice
        } else {
            data = {'username':form.username, 'password':form.password};//, 'remember':fields.choice
        }

        fetch('http://127.0.0.1:8000/accounts/login/',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
        .then(async response => {
            const result = await response.json()
        
            if (response.ok){
                if (fields.choice) {
                    localStorage.setItem('TestingGit',JSON.stringify(data));
                }
            
                setUser(result);
                navigate(-1);
            } else {
                UserAlert(fields.password, result.error || "Login failed. Check your credentials.");
            }
        })
        .catch(error => {
            console.error("Network error:", error);
            UserAlert(fields.password, "Network error. Try again.");
        });

    }

    function handleRemember() {
        fields.remember.toggleAttribute('defualtChecked');
        fields.choice = fields.choice? 0:1;
    }


    return (
        <div className="container">
            <div className="heading container">
                <div className="row">
                    <h2>Welcome to TestingGit</h2>
                </div>
            </div>
            <div className="form-space">
                <div className="form-boundary login">
                    <div className="form-wrap">
                        {/* <h3></h3> */}
                        <form id="loginform" onSubmit={(e) => handleSubmit(e)} className="login-form" >
                            <div className="form-item">
                                <input id="username" type="text" className="form-items" placeholder="Username" onChange={(e) => handleChange(e, 1)} required />
                                <input id="contact" type="text" className="form-items-Sw" placeholder="Phone Number/ Email" onChange={(e) => handleChange(e, 3)} />
                                <div className="user-contact quick-btn" onClick={handleLoginChoice}><span>{' > '}</span></div>
                            </div>
                            <div className="form-item">
                                <input id="password" type="password" className="form-items" autoComplete="true" placeholder="Password" onChange={(e) => handleChange(e, 2)} required />
                            </div>
                            <div className="form-item" >
                                <button type="submit" className="form-items btn">Log In</button>
                            </div>
                            <div className="form-item">
                                <div className="Tggl-btn" >
                                    <label className="Tggl-btn-wrap" onClick={handleRemember}>
                                        Remember Me 
                                        <input type="checkbox" defaultChecked/>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;